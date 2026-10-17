// node --import tsx --test scripts/test_classroom_realtime.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { subscribeClassroomChanges, CLASSROOM_REALTIME_TABLES } from "../src/services/classroomRealtime";
import { CLASSROOM_REALTIME_SQL } from "../src/services/classroomRealtimePolicy";
import { createRefreshQueue } from "../src/utils/refreshQueue";

const tick = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms));

test("three activity tables, burst coalescing, reconnect recovery, clean unsubscribe", async () => {
  const handlers: (() => void)[] = [];
  const tables: string[] = [];
  let statusCallback: (status: string) => void;
  let removed = 0;
  let changes = 0;
  const statuses: string[] = [];
  const channel = {
    on(_event: string, filter: any, handler: () => void) { tables.push(filter.table); handlers.push(handler); return this; },
    subscribe(callback: (status: string) => void) { statusCallback = callback; return this; },
  };
  const client = { channel() { return channel; }, async removeChannel(value: any) { assert.equal(value, channel); removed++; } };
  const cleanup = subscribeClassroomChanges(() => changes++, status => statuses.push(status), client as any);
  assert.deepEqual(tables, [...CLASSROOM_REALTIME_TABLES]);
  assert.ok(!(tables as string[]).includes("users"));
  statusCallback!("SUBSCRIBED");
  for (let i = 0; i < 20; i++) handlers[i % 3]();
  await tick(280);
  assert.equal(changes, 1);
  statusCallback!("CHANNEL_ERROR");
  statusCallback!("SUBSCRIBED");
  await tick(280);
  assert.equal(changes, 2, "reconnect must refetch missed submissions");
  assert.deepEqual(statuses, ["connecting", "live", "reconnecting", "live"]);
  handlers[0](); cleanup();
  await tick(280);
  assert.equal(changes, 2);
  assert.equal(removed, 1);
});

test("changes during a slow fetch produce exactly one follow-up, without starvation", async () => {
  let release: () => void;
  let calls = 0;
  const queue = createRefreshQueue(async () => {
    calls++;
    if (calls === 1) await new Promise<void>(resolve => { release = resolve; });
  }, 0);
  queue.trigger(); await tick();
  for (let i = 0; i < 100; i++) queue.trigger();
  assert.equal(calls, 1);
  release!(); await tick();
  assert.equal(calls, 2);
  queue.dispose(); queue.trigger(); await tick();
  assert.equal(calls, 2);
});

test("disposed scope drops pending work; a failed refresh can recover", async () => {
  let calls = 0;
  const disposed = createRefreshQueue(async () => { calls++; });
  disposed.trigger(); disposed.dispose(); await tick(120);
  assert.equal(calls, 0);
  const queue = createRefreshQueue(async () => { calls++; if (calls === 1) throw Error("network"); }, 0);
  queue.trigger(); await tick(); queue.trigger(); await tick();
  assert.equal(calls, 2);
  queue.dispose();
});

test("offline status and idempotent publication bootstrap", () => {
  const statuses: string[] = [];
  subscribeClassroomChanges(() => assert.fail("unexpected refresh"), status => statuses.push(status), null)();
  assert.deepEqual(statuses, ["offline"]);
  assert.equal(CLASSROOM_REALTIME_SQL, readFileSync("sql/classroom_realtime.sql", "utf8"));
});
