import { getSupabase } from "../lib/supabase";
import type { DirectChatMessage, User } from "../types";
import { GROUP_MESSAGE_MAX_LENGTH } from "../types";
import { assertChatAllowed } from "../utils/chatRateLimit";
import {
  buildClassRoomId,
  canAccessChatRoom,
  canCreateDmBetween,
  CLASS_ALL_ROOM_ID,
  getDmPeerId,
  isStaffRole,
  MAX_CHAT_ROOM_MESSAGES,
  mergeChatMessages,
  parseChatRoomId,
} from "../utils/chatRooms";
import { broadcastChatMessage, broadcastChatRoomSync } from "./chatRealtime";

const ROOM_KEY_PREFIX = "chat_room:";
const READS_KEY_PREFIX = "chat_reads:";
const LOCAL_THREADS_PREFIX = "pyedu_chat_threads_";
const LOCAL_READS_PREFIX = "pyedu_chat_reads_";

interface StoredRoomPayload {
  v: number;
  messages: DirectChatMessage[];
}

function parseRoomPayload(raw: string | null): DirectChatMessage[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.messages)) return parsed.messages;
  } catch {}
  return [];
}

function serializeRoomPayload(messages: DirectChatMessage[]): string {
  const payload: StoredRoomPayload = {
    v: 1,
    messages: messages.slice(-MAX_CHAT_ROOM_MESSAGES),
  };
  return JSON.stringify(payload);
}

function readLocalThreads(userId: string): Record<string, DirectChatMessage[]> {
  try {
    const raw = localStorage.getItem(`${LOCAL_THREADS_PREFIX}${userId}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalThreads(userId: string, threads: Record<string, DirectChatMessage[]>): void {
  try {
    localStorage.setItem(`${LOCAL_THREADS_PREFIX}${userId}`, JSON.stringify(threads));
  } catch {}
}

function readLocalReads(userId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(`${LOCAL_READS_PREFIX}${userId}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalReads(userId: string, reads: Record<string, number>): void {
  try {
    localStorage.setItem(`${LOCAL_READS_PREFIX}${userId}`, JSON.stringify(reads));
  } catch {}
}

async function readRoomRowFromSupabase(roomId: string): Promise<{ messages: DirectChatMessage[]; raw: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { messages: [], raw: null };
  const key = `${ROOM_KEY_PREFIX}${roomId}`;
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) {
    throw new Error("Không thể tải nội dung cuộc trò chuyện từ máy chủ.");
  }
  const raw = data?.value !== undefined && data?.value !== null ? String(data.value) : null;
  return { messages: parseRoomPayload(raw), raw };
}

async function writeRoomRowCasSupabase(
  roomId: string,
  prevRaw: string | null,
  nextMessages: DirectChatMessage[],
  updatedBy: string
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const key = `${ROOM_KEY_PREFIX}${roomId}`;
  const nextRaw = serializeRoomPayload(nextMessages);
  const now = new Date().toISOString();

  if (prevRaw === null) {
    const { error } = await supabase.from("app_settings").insert({
      key,
      value: nextRaw,
      updated_by: updatedBy,
      updated_at: now,
    });
    if (error) {
      if (error.code === "23505" || (error.message || "").toLowerCase().includes("duplicate")) {
        return false;
      }
      throw new Error("Không lưu được tin nhắn lên máy chủ.");
    }
    return true;
  }

  const { data, error } = await supabase
    .from("app_settings")
    .update({
      value: nextRaw,
      updated_by: updatedBy,
      updated_at: now,
    })
    .eq("key", key)
    .eq("value", prevRaw)
    .select("key")
    .maybeSingle();
  if (error) {
    throw new Error("Không lưu được tin nhắn lên máy chủ.");
  }
  return !!data;
}

export const ChatService = {
  async fetchAccessibleThreads(currentUser: User): Promise<Record<string, DirectChatMessage[]>> {
    if (!currentUser?.id) return {};
    const supabase = getSupabase();
    const threads: Record<string, DirectChatMessage[]> = {};

    if (supabase) {
      try {
        const classQuery = isStaffRole(currentUser.role)
          ? supabase.from("app_settings").select("key,value").like("key", `${ROOM_KEY_PREFIX}class:%`)
          : supabase
              .from("app_settings")
              .select("key,value")
              .in(
                "key",
                Array.from(
                  new Set([
                    `${ROOM_KEY_PREFIX}${CLASS_ALL_ROOM_ID}`,
                    ...(currentUser.grade?.trim() ? [`${ROOM_KEY_PREFIX}${buildClassRoomId(currentUser.grade)}`] : []),
                  ])
                )
              );

        const dmQuery = supabase
          .from("app_settings")
          .select("key,value")
          .or(`key.like.${ROOM_KEY_PREFIX}dm~${currentUser.id}~%,key.like.${ROOM_KEY_PREFIX}dm~%~${currentUser.id}`);

        const [classRes, dmRes] = await Promise.all([classQuery, dmQuery]);
        const rows = [...(classRes.data || []), ...(dmRes.data || [])];
        for (const row of rows) {
          const key = String(row.key || "");
          if (!key.startsWith(ROOM_KEY_PREFIX)) continue;
          const roomId = key.slice(ROOM_KEY_PREFIX.length);
          if (!canAccessChatRoom(currentUser, roomId)) continue;
          threads[roomId] = mergeChatMessages([], parseRoomPayload(row.value ? String(row.value) : null));
        }
        saveLocalThreads(currentUser.id, threads);
        return threads;
      } catch (err) {
        console.warn("ChatService.fetchAccessibleThreads fallback notice:", err);
      }
    }

    // Fallback: Express SQLite API
    try {
      const res = await fetch(`/api/chat/rooms?userId=${encodeURIComponent(currentUser.id)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.threads && typeof data.threads === "object") {
          for (const [roomId, msgs] of Object.entries<any>(data.threads)) {
            if (canAccessChatRoom(currentUser, roomId) && Array.isArray(msgs)) {
              threads[roomId] = mergeChatMessages([], msgs);
            }
          }
          saveLocalThreads(currentUser.id, threads);
          return threads;
        }
      }
    } catch {}

    // Offline localStorage cache (filtered strictly by access rules)
    const cached = readLocalThreads(currentUser.id);
    for (const [roomId, msgs] of Object.entries(cached)) {
      if (canAccessChatRoom(currentUser, roomId) && Array.isArray(msgs)) {
        threads[roomId] = msgs;
      }
    }
    return threads;
  },

  async fetchRoomMessages(currentUser: User, roomId: string): Promise<DirectChatMessage[]> {
    if (!canAccessChatRoom(currentUser, roomId)) {
      throw new Error("Bạn không có quyền truy cập phòng chat này.");
    }

    if (getSupabase()) {
      const { messages } = await readRoomRowFromSupabase(roomId);
      const cached = readLocalThreads(currentUser.id);
      cached[roomId] = messages;
      saveLocalThreads(currentUser.id, cached);
      return messages;
    }

    try {
      const res = await fetch(`/api/chat/rooms/${encodeURIComponent(roomId)}/messages?userId=${encodeURIComponent(currentUser.id)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.messages)) {
          const cached = readLocalThreads(currentUser.id);
          cached[roomId] = data.messages;
          saveLocalThreads(currentUser.id, cached);
          return data.messages;
        }
      }
    } catch {}

    const cached = readLocalThreads(currentUser.id);
    return cached[roomId] || [];
  },

  async sendMessage(
    sender: User,
    roomId: string,
    payload: { content: string; codeSnippet?: string; pinned?: boolean },
    allUsers: User[] = []
  ): Promise<DirectChatMessage> {
    if (!canAccessChatRoom(sender, roomId)) {
      throw new Error("Bạn không có quyền gửi tin nhắn trong phòng chat này.");
    }

    const parsed = parseChatRoomId(roomId);
    if (!parsed) throw new Error("Phòng chat không hợp lệ.");

    let recipientId: string | null = null;
    if (parsed.kind === "dm") {
      recipientId = getDmPeerId(roomId, sender.id);
      if (!recipientId) throw new Error("Không xác định được người nhận tin nhắn.");
      const peerUser = allUsers.find(u => u.id === recipientId);
      if (peerUser && !canCreateDmBetween(sender, peerUser)) {
        throw new Error("Chat riêng chỉ hỗ trợ giữa giáo viên và học sinh.");
      }
    }

    const cleanContent = (payload.content || "").trim().slice(0, GROUP_MESSAGE_MAX_LENGTH);
    const cleanCode = payload.codeSnippet ? payload.codeSnippet.trim().slice(0, GROUP_MESSAGE_MAX_LENGTH) : "";
    const pinned = Boolean(payload.pinned && parsed.kind === "class" && isStaffRole(sender.role));

    const newMsg: DirectChatMessage = {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      roomId,
      senderId: sender.id,
      senderName: sender.fullName,
      senderAvatar: sender.avatar,
      senderRole: sender.role,
      content: cleanContent,
      ...(cleanCode ? { codeSnippet: cleanCode } : {}),
      ...(pinned ? { pinned: true } : {}),
      timestamp: new Date().toISOString(),
    };

    const supabase = getSupabase();
    if (supabase) {
      for (let attempt = 0; attempt < 5; attempt++) {
        const { messages, raw } = await readRoomRowFromSupabase(roomId);
        const senderRecent = messages
          .filter(m => m.senderId === sender.id)
          .map(m => ({ timestamp: m.timestamp, content: m.content, codeSnippet: m.codeSnippet || "" }));
        assertChatAllowed(sender.role, senderRecent, cleanContent, cleanCode);

        const nextMessages = mergeChatMessages(messages, [newMsg]);
        const wrote = await writeRoomRowCasSupabase(roomId, raw, nextMessages, sender.id);
        if (wrote) {
          const cached = readLocalThreads(sender.id);
          cached[roomId] = nextMessages;
          saveLocalThreads(sender.id, cached);
          void broadcastChatMessage(newMsg, recipientId, supabase);
          return newMsg;
        }
      }
      throw new Error("Máy chủ đang bận đồng bộ tin nhắn. Vui lòng thử gửi lại.");
    }

    // Fallback: Express SQLite API
    try {
      const res = await fetch(`/api/chat/rooms/${encodeURIComponent(roomId)}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: sender.id,
          content: cleanContent,
          codeSnippet: cleanCode || undefined,
          pinned,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.message) {
        const cached = readLocalThreads(sender.id);
        cached[roomId] = mergeChatMessages(cached[roomId] || [], [data.message]);
        saveLocalThreads(sender.id, cached);
        return data.message;
      }
      if (!res.ok && data?.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      if (err?.message && !String(err.message).toLowerCase().includes("fetch")) {
        throw err;
      }
    }

    // Offline fallback
    const cached = readLocalThreads(sender.id);
    const existing = cached[roomId] || [];
    const recent = existing
      .filter(m => m.senderId === sender.id)
      .map(m => ({ timestamp: m.timestamp, content: m.content, codeSnippet: m.codeSnippet || "" }));
    assertChatAllowed(sender.role, recent, cleanContent, cleanCode);
    cached[roomId] = mergeChatMessages(existing, [newMsg]);
    saveLocalThreads(sender.id, cached);
    return newMsg;
  },

  async togglePinMessage(teacher: User, roomId: string, messageId: string): Promise<DirectChatMessage[]> {
    if (!isStaffRole(teacher.role) || !canAccessChatRoom(teacher, roomId)) {
      throw new Error("Chỉ giáo viên mới có quyền ghim thông báo lớp.");
    }
    const parsed = parseChatRoomId(roomId);
    if (!parsed || parsed.kind !== "class") {
      throw new Error("Chỉ hỗ trợ ghim tin nhắn trong kênh lớp học.");
    }

    const supabase = getSupabase();
    if (supabase) {
      for (let attempt = 0; attempt < 4; attempt++) {
        const { messages, raw } = await readRoomRowFromSupabase(roomId);
        const nextMessages = messages.map(m =>
          m.id === messageId ? { ...m, pinned: !m.pinned } : m
        );
        const wrote = await writeRoomRowCasSupabase(roomId, raw, nextMessages, teacher.id);
        if (wrote) {
          const cached = readLocalThreads(teacher.id);
          cached[roomId] = nextMessages;
          saveLocalThreads(teacher.id, cached);
          void broadcastChatRoomSync(roomId, null, supabase);
          return nextMessages;
        }
      }
      throw new Error("Không thể cập nhật trạng thái ghim lúc này.");
    }

    try {
      const res = await fetch(`/api/chat/rooms/${encodeURIComponent(roomId)}/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: teacher.id, messageId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.messages)) return data.messages;
      }
    } catch {}

    const cached = readLocalThreads(teacher.id);
    const nextMessages = (cached[roomId] || []).map(m =>
      m.id === messageId ? { ...m, pinned: !m.pinned } : m
    );
    cached[roomId] = nextMessages;
    saveLocalThreads(teacher.id, cached);
    return nextMessages;
  },

  async getReadReceipts(userId: string): Promise<Record<string, number>> {
    const local = readLocalReads(userId);
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data } = await supabase
          .from("app_settings")
          .select("value")
          .eq("key", `${READS_KEY_PREFIX}${userId}`)
          .maybeSingle();
        if (data?.value) {
          const remote = JSON.parse(String(data.value));
          if (remote && typeof remote === "object") {
            const merged: Record<string, number> = { ...local };
            for (const [k, v] of Object.entries<any>(remote)) {
              const num = Number(v) || 0;
              if (num > (merged[k] || 0)) merged[k] = num;
            }
            saveLocalReads(userId, merged);
            return merged;
          }
        }
      } catch {}
    }
    return local;
  },

  async markRoomRead(userId: string, roomId: string, timestampMs = Date.now()): Promise<Record<string, number>> {
    const current = readLocalReads(userId);
    const prev = current[roomId] || 0;
    const nextVal = Math.max(prev, timestampMs);
    const next = { ...current, [roomId]: nextVal };
    saveLocalReads(userId, next);

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("app_settings").upsert(
          {
            key: `${READS_KEY_PREFIX}${userId}`,
            value: JSON.stringify(next),
            updated_by: userId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        );
      } catch {}
    }
    return next;
  },
};
