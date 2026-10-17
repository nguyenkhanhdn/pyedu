import { useEffect, useRef } from "react";
import { createRefreshQueue } from "../utils/refreshQueue";

/** Realtime invalidation plus periodic/focus recovery, with one fetch at a time. */
export function useLiveRefresh(load: () => Promise<void>, version: number, scope: string, invalidate: () => void) {
  const latestLoad = useRef(load);
  const latestInvalidate = useRef(invalidate);
  latestLoad.current = load;
  latestInvalidate.current = invalidate;
  const queue = useRef<ReturnType<typeof createRefreshQueue> | null>(null);
  useEffect(() => {
    const worker = createRefreshQueue(() => latestLoad.current());
    queue.current = worker;
    worker.trigger();
    const refresh = () => { if (document.visibilityState === "visible") worker.trigger(); };
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => {
      latestInvalidate.current(); worker.dispose();
      window.clearInterval(timer); window.removeEventListener("focus", refresh);
      if (queue.current === worker) queue.current = null;
    };
  }, [scope]);
  useEffect(() => { queue.current?.trigger(); }, [version]);
  return () => queue.current?.trigger();
}
