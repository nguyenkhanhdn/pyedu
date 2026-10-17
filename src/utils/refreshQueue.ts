/** Serialize refreshes and remember a change received while a fetch is running. */
export function createRefreshQueue(task: () => Promise<void>, delay = 100) {
  let dirty = false;
  let running = false;
  let closed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = async () => {
    timer = undefined;
    if (closed || running) return;
    running = true;
    try {
      while (dirty && !closed) {
        dirty = false;
        try { await task(); } catch { /* The caller displays fetch errors. */ }
      }
    } finally { running = false; }
  };
  return {
    trigger() {
      if (closed) return;
      dirty = true;
      if (!running && !timer) timer = setTimeout(() => void run(), delay);
    },
    dispose() { closed = true; dirty = false; if (timer) clearTimeout(timer); },
  };
}
