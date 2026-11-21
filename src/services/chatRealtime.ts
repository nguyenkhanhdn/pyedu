import { getSupabase } from "../lib/supabase";
import type { DirectChatMessage, User } from "../types";
import { canAccessChatRoom } from "../utils/chatRooms";

export type ChatConnectionStatus = "connecting" | "live" | "reconnecting" | "offline";

export interface ChatRealtimeHandlers {
  onMessage: (message: DirectChatMessage) => void;
  onRoomSync: (roomId: string) => void;
  onStatusChange: (status: ChatConnectionStatus) => void;
}

function encodeChannelKey(raw: string): string {
  return encodeURIComponent(raw).replace(/%/g, "_");
}

export function subscribeChatRealtime(
  currentUser: User | null,
  activeRoomId: string | null,
  handlers: ChatRealtimeHandlers,
  client = getSupabase()
): () => void {
  if (!client || !currentUser) {
    handlers.onStatusChange("offline");
    return () => {};
  }

  let closed = false;
  let everSubscribed = false;
  const channels: any[] = [];
  const syncTimers = new Map<string, ReturnType<typeof setTimeout>>();

  const triggerRoomSync = (roomId: string) => {
    if (closed || !canAccessChatRoom(currentUser, roomId)) return;
    if (syncTimers.has(roomId)) return;
    syncTimers.set(
      roomId,
      setTimeout(() => {
        syncTimers.delete(roomId);
        if (!closed) handlers.onRoomSync(roomId);
      }, 150)
    );
  };

  handlers.onStatusChange("connecting");

  const trackStatus = (status: string) => {
    if (closed) return;
    if (status === "SUBSCRIBED") {
      const wasReconnect = everSubscribed;
      everSubscribed = true;
      handlers.onStatusChange("live");
      if (wasReconnect && activeRoomId) {
        triggerRoomSync(activeRoomId);
      }
    } else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status)) {
      handlers.onStatusChange("reconnecting");
    }
  };

  // 1. Personal DM inbox channel (only pings meant for this user)
  const dmInbox = client.channel(`pyedu-chat-inbox-${encodeChannelKey(currentUser.id)}`, {
    config: { broadcast: { self: false } },
  });
  dmInbox
    .on("broadcast", { event: "inbox" }, ({ payload }: any) => {
      if (closed || !payload?.roomId) return;
      if (!canAccessChatRoom(currentUser, payload.roomId)) return;
      if (payload.message) handlers.onMessage(payload.message as DirectChatMessage);
      else triggerRoomSync(payload.roomId);
    })
    .on("broadcast", { event: "room-sync" }, ({ payload }: any) => {
      if (closed || !payload?.roomId) return;
      triggerRoomSync(payload.roomId);
    })
    .subscribe(trackStatus);
  channels.push(dmInbox);

  // 2. Class announcements/channels broadcast
  const classInbox = client.channel("pyedu-chat-class-inbox", {
    config: { broadcast: { self: false } },
  });
  classInbox
    .on("broadcast", { event: "inbox" }, ({ payload }: any) => {
      if (closed || !payload?.roomId) return;
      if (!canAccessChatRoom(currentUser, payload.roomId)) return;
      if (payload.message) handlers.onMessage(payload.message as DirectChatMessage);
      else triggerRoomSync(payload.roomId);
    })
    .on("broadcast", { event: "room-sync" }, ({ payload }: any) => {
      if (closed || !payload?.roomId) return;
      triggerRoomSync(payload.roomId);
    })
    .subscribe();
  channels.push(classInbox);

  // 3. Active room channel (for immediate message & pin updates in open thread)
  if (activeRoomId && canAccessChatRoom(currentUser, activeRoomId)) {
    const roomChannel = client.channel(`pyedu-chat-room-${encodeChannelKey(activeRoomId)}`, {
      config: { broadcast: { self: false } },
    });
    roomChannel
      .on("broadcast", { event: "message" }, ({ payload }: any) => {
        if (closed || !payload?.message) return;
        if (payload.message.roomId !== activeRoomId) return;
        handlers.onMessage(payload.message as DirectChatMessage);
      })
      .on("broadcast", { event: "room-sync" }, ({ payload }: any) => {
        if (closed) return;
        triggerRoomSync(payload?.roomId || activeRoomId);
      })
      .subscribe();
    channels.push(roomChannel);
  }

  return () => {
    closed = true;
    for (const t of syncTimers.values()) clearTimeout(t);
    syncTimers.clear();
    for (const ch of channels) {
      void client.removeChannel(ch).catch(() => {});
    }
  };
}

export async function broadcastChatMessage(
  message: DirectChatMessage,
  recipientId: string | null,
  client = getSupabase()
): Promise<void> {
  if (!client) return;
  const sendToChannel = async (channelName: string, event: string, payload: any) => {
    const ch = client.channel(channelName);
    try {
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 1200);
        ch.subscribe((status) => {
          if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            clearTimeout(timeout);
            resolve();
          }
        });
      });
      await ch.send({ type: "broadcast", event, payload });
    } catch {
      // Persistence in DB is authoritative; broadcast is best-effort live acceleration.
    } finally {
      await client.removeChannel(ch).catch(() => {});
    }
  };

  const tasks: Promise<void>[] = [
    sendToChannel(`pyedu-chat-room-${encodeChannelKey(message.roomId)}`, "message", { message }),
  ];

  if (message.roomId.startsWith("dm~") && recipientId) {
    tasks.push(
      sendToChannel(`pyedu-chat-inbox-${encodeChannelKey(recipientId)}`, "inbox", {
        roomId: message.roomId,
        message,
      })
    );
  } else if (message.roomId.startsWith("class:")) {
    tasks.push(
      sendToChannel("pyedu-chat-class-inbox", "inbox", {
        roomId: message.roomId,
        message,
      })
    );
  }

  await Promise.all(tasks);
}

export async function broadcastChatRoomSync(
  roomId: string,
  recipientId: string | null,
  client = getSupabase()
): Promise<void> {
  if (!client) return;
  const sendSync = async (channelName: string) => {
    const ch = client.channel(channelName);
    try {
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 1200);
        ch.subscribe((status) => {
          if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            clearTimeout(timeout);
            resolve();
          }
        });
      });
      await ch.send({ type: "broadcast", event: "room-sync", payload: { roomId } });
    } catch {
    } finally {
      await client.removeChannel(ch).catch(() => {});
    }
  };

  const tasks: Promise<void>[] = [
    sendSync(`pyedu-chat-room-${encodeChannelKey(roomId)}`),
  ];
  if (roomId.startsWith("dm~") && recipientId) {
    tasks.push(sendSync(`pyedu-chat-inbox-${encodeChannelKey(recipientId)}`));
  } else if (roomId.startsWith("class:")) {
    tasks.push(sendSync("pyedu-chat-class-inbox"));
  }
  await Promise.all(tasks);
}
