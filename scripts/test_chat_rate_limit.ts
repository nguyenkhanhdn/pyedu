// node --import tsx --test scripts/test_chat_rate_limit.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { assertChatAllowed } from "../src/utils/chatRateLimit";
import { GROUP_CHAT_ANTISPAM_SQL } from "../src/services/groupChatPolicy";
const now = Date.now();
const message = (age: number, content = "hello", codeSnippet = "") => ({ timestamp: new Date(now-age).toISOString(), content, codeSnippet });
test("5-second account cooldown, including a different destination group", () => {
  assert.throws(() => assertChatAllowed("student", [message(4999)], "other", "", now), /5 giây/);
  assert.doesNotThrow(() => assertChatAllowed("student", [message(5000)], "other", "", now));
});
test("ten messages per rolling minute; expired records do not count", () => {
  assert.throws(() => assertChatAllowed("student", Array.from({length:10},(_,i)=>message(6000+i,"old"+i)), "other", "", now), /10 tin/);
  assert.doesNotThrow(() => assertChatAllowed("student", Array.from({length:10},()=>message(60000)), "other", "", now));
});
test("duplicate text and code normalized; changing text or code allows discussion", () => {
  assert.throws(() => assertChatAllowed("student", [message(6000," Hello   there ","print(1)")], "HELLO there", " print(1) ", now), /60 giây/);
  assert.throws(() => assertChatAllowed("student", [message(6000,"","print(1)")], "", "print(1)", now), /60 giây/);
  assert.doesNotThrow(() => assertChatAllowed("student", [message(6000,"same","print(1)")], "same", "print(2)", now));
});
test("staff exempt from rate limits, but empty/oversize messages rejected", () => {
  for(const role of ["teacher","admin"]) assert.doesNotThrow(()=>assertChatAllowed(role,[message(1)],"hello","",now));
  assert.throws(()=>assertChatAllowed("teacher",[]," ","",now),/để trống/);
  assert.throws(()=>assertChatAllowed("student",[],"x".repeat(1001),"",now),/1000/);
  assert.throws(()=>assertChatAllowed("deleted",[],"hello","",now),/không được phép/);
});
test("bootstrap and applied SQL stay identical", () => {
  assert.equal(GROUP_CHAT_ANTISPAM_SQL,readFileSync("sql/group_chat_anti_spam.sql","utf8"));
});

test("remote rejection never becomes a fake local success", async () => {
  const { ApiService } = await import("../src/services/apiClient");
  const { SupabaseService } = await import("../src/services/supabaseService");
  const originalAvailable = SupabaseService.isAvailable;
  const originalSend = SupabaseService.addGroupMessage;
  SupabaseService.isAvailable = () => true;
  SupabaseService.addGroupMessage = async () => { throw new Error("CHAT_RATE_LIMIT: wait"); };
  try {
    await assert.rejects(ApiService.sendGroupMessage("group", { userId: "student", content: "hello" }), /CHAT_RATE_LIMIT/);
  } finally {
    SupabaseService.isAvailable = originalAvailable;
    SupabaseService.addGroupMessage = originalSend;
  }
});
