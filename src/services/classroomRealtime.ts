import { getSupabase } from "../lib/supabase";

export type ClassroomConnection = "connecting" | "live" | "reconnecting" | "offline";
export const CLASSROOM_REALTIME_TABLES = ["submissions", "algorithm_submissions", "user_progress"] as const;

/** Only invalidations leave the channel: do not retain code or profile payloads. */
export function subscribeClassroomChanges(onChange: () => void, onStatus: (status: ClassroomConnection) => void, client = getSupabase()) {
  if (!client) { onStatus("offline"); return () => {}; }
  let closed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const changed = () => {
    if (closed || timer) return;
    // Fixed coalescing window; continuous activity cannot postpone updates forever.
    timer = setTimeout(() => { timer = undefined; if (!closed) onChange(); }, 250);
  };
  onStatus("connecting");
  const channel = client.channel(`classroom-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  for (const table of CLASSROOM_REALTIME_TABLES) channel.on("postgres_changes", { event: "*", schema: "public", table }, changed);
  channel.subscribe(status => {
    if (closed) return;
    if (status === "SUBSCRIBED") { onStatus("live"); changed(); }
    else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status)) onStatus("reconnecting");
  });
  return () => { closed = true; if (timer) clearTimeout(timer); void client.removeChannel(channel).catch(() => {}); };
}
