// node --import tsx --test scripts/test_chat.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import type { DirectChatMessage, User } from "../src/types";
import {
  buildClassRoomId,
  buildDmRoomId,
  canAccessChatRoom,
  canCreateDmBetween,
  CLASS_ALL_ROOM_ID,
  countUnreadMessages,
  getVisibleClassChannels,
  getVisibleDmPeers,
  mergeChatMessages,
  parseChatRoomId,
} from "../src/utils/chatRooms";
import { subscribeChatRealtime } from "../src/services/chatRealtime";

function makeUser(overrides: Partial<User>): User {
  return {
    id: "usr-default",
    username: "user",
    email: "user@example.com",
    fullName: "Default User",
    avatar: "https://example.com/a.png",
    role: "student",
    status: "active",
    grade: "Lớp 10A1",
    totalXp: 0,
    weeklyXp: 0,
    streakDays: 1,
    lastActiveDate: "2026-11-21",
    badges: [],
    completedLessons: [],
    dailyGoal: 20,
    reminderTime: "19:30",
    reminderEnabled: true,
    ...overrides,
  };
}

const teacher1 = makeUser({ id: "teacher-1", username: "gv1", fullName: "Thầy Nam", role: "teacher", grade: "Giáo viên Tin học" });
const teacher2 = makeUser({ id: "teacher-2", username: "gv2", fullName: "Cô Lan", role: "teacher", grade: "Giáo viên Tin học" });
const studentA = makeUser({ id: "stu-a", username: "a", fullName: "Nguyễn An", role: "student", grade: "Lớp 10A1" });
const studentB = makeUser({ id: "stu-b", username: "b", fullName: "Trần Bình", role: "student", grade: "Lớp 10A2" });
const blockedStu = makeUser({ id: "stu-blocked", username: "blk", fullName: "Blocked", role: "student", grade: "Lớp 10A1", status: "blocked" });

test("room ID builders and parsers enforce deterministic IDs and safety", () => {
  assert.equal(buildClassRoomId(), CLASS_ALL_ROOM_ID);
  assert.equal(buildClassRoomId("all"), CLASS_ALL_ROOM_ID);
  assert.equal(buildClassRoomId("Lớp 10A1"), "class:Lớp 10A1");
  assert.deepEqual(parseChatRoomId("class:Lớp 10A1"), { kind: "class", grade: "Lớp 10A1" });

  const dm1 = buildDmRoomId(teacher1.id, studentA.id);
  const dm2 = buildDmRoomId(studentA.id, teacher1.id);
  assert.equal(dm1, dm2);
  assert.equal(dm1, "dm~stu-a~teacher-1");
  assert.deepEqual(parseChatRoomId(dm1), { kind: "dm", participants: ["stu-a", "teacher-1"] });

  assert.throws(() => buildDmRoomId(studentA.id, studentA.id));
  assert.throws(() => buildDmRoomId("bad~id", teacher1.id));
  assert.equal(parseChatRoomId("dm~same~same"), null);
  assert.equal(parseChatRoomId("unknown:1"), null);
});

test("strict access control isolates class channels and private 1-on-1 DMs", () => {
  // Class channels
  assert.equal(canAccessChatRoom(teacher1, "class:all"), true);
  assert.equal(canAccessChatRoom(teacher1, "class:Lớp 10A1"), true);
  assert.equal(canAccessChatRoom(teacher1, "class:Lớp 10A2"), true);

  assert.equal(canAccessChatRoom(studentA, "class:all"), true);
  assert.equal(canAccessChatRoom(studentA, "class:Lớp 10A1"), true);
  assert.equal(canAccessChatRoom(studentA, "class:Lớp 10A2"), false, "Student cannot read another class channel");

  // Private 1-on-1 DM
  const dmRoom = buildDmRoomId(teacher1.id, studentA.id);
  assert.equal(canAccessChatRoom(teacher1, dmRoom), true);
  assert.equal(canAccessChatRoom(studentA, dmRoom), true);
  assert.equal(canAccessChatRoom(studentB, dmRoom), false, "Another student cannot read private DM");
  assert.equal(canAccessChatRoom(teacher2, dmRoom), false, "Unrelated teacher cannot read someone else's 1-on-1 DM");

  // Blocked users rejected
  assert.equal(canAccessChatRoom(blockedStu, "class:all"), false);
  assert.equal(canAccessChatRoom(blockedStu, buildDmRoomId(teacher1.id, blockedStu.id)), false);

  // DM creation permissions
  assert.equal(canCreateDmBetween(teacher1, studentA), true);
  assert.equal(canCreateDmBetween(studentA, teacher1), true);
  assert.equal(canCreateDmBetween(studentA, studentB), false, "Student-to-student DMs blocked");
  assert.equal(canCreateDmBetween(teacher1, blockedStu), false);
});

test("visible channels and DM peers match role and unread counts", () => {
  const users = [teacher1, teacher2, studentA, studentB, blockedStu];
  const teacherChannels = getVisibleClassChannels(teacher1, users);
  assert.deepEqual(
    teacherChannels.map(c => c.roomId),
    ["class:all", "class:Lớp 10A1", "class:Lớp 10A2"]
  );

  const studentAChannels = getVisibleClassChannels(studentA, users);
  assert.deepEqual(
    studentAChannels.map(c => c.roomId),
    ["class:all", "class:Lớp 10A1"]
  );

  const teacherPeers = getVisibleDmPeers(teacher1, users);
  assert.deepEqual(teacherPeers.map(u => u.id), ["stu-a", "stu-b"]);

  const studentPeers = getVisibleDmPeers(studentA, users);
  assert.deepEqual(studentPeers.map(u => u.id), ["teacher-2", "teacher-1"]);
});

test("idempotent merge and unread message counting", () => {
  const m1: DirectChatMessage = {
    id: "m1",
    roomId: "class:all",
    senderId: teacher1.id,
    senderName: teacher1.fullName,
    senderAvatar: teacher1.avatar,
    senderRole: "teacher",
    content: "Chào cả lớp",
    timestamp: "2026-11-21T08:00:00.000Z",
  };
  const m2: DirectChatMessage = {
    id: "m2",
    roomId: "class:all",
    senderId: studentA.id,
    senderName: studentA.fullName,
    senderAvatar: studentA.avatar,
    senderRole: "student",
    content: "Em chào thầy",
    timestamp: "2026-11-21T08:05:00.000Z",
  };
  const merged = mergeChatMessages([m2, m1], [m1]);
  assert.equal(merged.length, 2);
  assert.deepEqual(merged.map(m => m.id), ["m1", "m2"]);

  // m2 was sent by studentA, so unread count for studentA at t=0 is 1 (m1 only)
  assert.equal(countUnreadMessages(merged, 0, studentA.id), 1);
  // After reading up to m1 timestamp, unread for studentA is 0
  assert.equal(countUnreadMessages(merged, Date.parse(m1.timestamp), studentA.id), 0);
  // For teacher1 at t=0, unread is 1 (m2 only)
  assert.equal(countUnreadMessages(merged, 0, teacher1.id), 1);
});

test("realtime subscription enforces room isolation and triggers reconnect sync", async () => {
  const listeners = new Map<string, Record<string, ((payload: any) => void)[]>>();
  const channelStatus: ((s: string) => void)[] = [];
  let removed = 0;

  const mockClient = {
    channel(name: string) {
      const ch = {
        on(_type: string, filter: { event: string }, cb: (payload: any) => void) {
          const evMap = listeners.get(name) || {};
          evMap[filter.event] = [...(evMap[filter.event] || []), cb];
          listeners.set(name, evMap);
          return ch;
        },
        subscribe(cb?: (s: string) => void) {
          if (cb) channelStatus.push(cb);
          return ch;
        },
      };
      return ch;
    },
    async removeChannel() {
      removed++;
    },
  };

  const received: DirectChatMessage[] = [];
  const syncs: string[] = [];
  const statuses: string[] = [];

  const dmRoom = buildDmRoomId(teacher1.id, studentA.id);
  const cleanup = subscribeChatRealtime(
    studentA,
    dmRoom,
    {
      onMessage: m => received.push(m),
      onRoomSync: r => syncs.push(r),
      onStatusChange: s => statuses.push(s),
    },
    mockClient as any
  );

  // Simulate SUBSCRIBED
  channelStatus.forEach(cb => cb("SUBSCRIBED"));

  // Simulate unauthorized class message broadcast on class inbox -> must be dropped
  const classInboxHandlers = listeners.get("pyedu-chat-class-inbox")?.inbox || [];
  classInboxHandlers.forEach(fn =>
    fn({
      payload: {
        roomId: "class:Lớp 10A2",
        message: {
          id: "unauth-1",
          roomId: "class:Lớp 10A2",
          senderId: teacher1.id,
          senderName: teacher1.fullName,
          senderAvatar: "",
          senderRole: "teacher",
          content: "Secret 10A2",
          timestamp: "2026-11-21T09:00:00.000Z",
        },
      },
    })
  );
  assert.equal(received.length, 0);

  // Simulate authorized DM message -> must be received
  const dmRoomKey = `pyedu-chat-room-${encodeURIComponent(dmRoom).replace(/%/g, "_")}`;
  const roomHandlers = listeners.get(dmRoomKey)?.message || [];
  roomHandlers.forEach(fn =>
    fn({
      payload: {
        message: {
          id: "dm-1",
          roomId: dmRoom,
          senderId: teacher1.id,
          senderName: teacher1.fullName,
          senderAvatar: "",
          senderRole: "teacher",
          content: "Chào An",
          timestamp: "2026-11-21T09:01:00.000Z",
        },
      },
    })
  );
  assert.equal(received.length, 1);
  assert.equal(received[0].id, "dm-1");

  // Reconnect triggers room sync
  channelStatus.forEach(cb => cb("CHANNEL_ERROR"));
  channelStatus.forEach(cb => cb("SUBSCRIBED"));
  await new Promise(r => setTimeout(r, 200));
  assert.deepEqual(syncs, [dmRoom]);
  assert.deepEqual(statuses, ["connecting", "live", "reconnecting", "live"]);

  cleanup();
  assert.equal(removed, 3);
});
