import type { DirectChatMessage, User } from "../types";

export const CLASS_ALL_ROOM_ID = "class:all";
export const MAX_CHAT_ROOM_MESSAGES = 250;

export type ParsedChatRoom =
  | { kind: "class"; grade: string }
  | { kind: "dm"; participants: [string, string] };

export function isStaffRole(role?: string): boolean {
  return role === "teacher" || role === "admin";
}

export function isActiveAccount(user: Pick<User, "role" | "status"> | null | undefined): boolean {
  if (!user) return false;
  if (user.role === "deleted") return false;
  if (user.status && user.status !== "active") return false;
  return ["student", "teacher", "admin"].includes(user.role);
}

export function assertSafeChatIdentifier(id: string): string {
  const clean = (id || "").trim();
  if (!clean || clean.includes("~") || clean.includes("%") || clean.includes("*")) {
    throw new Error("Mã định danh người dùng không hợp lệ cho phòng chat.");
  }
  return clean;
}

export function buildClassRoomId(grade?: string): string {
  const clean = (grade || "").trim();
  if (!clean || clean.toLowerCase() === "all") return CLASS_ALL_ROOM_ID;
  return `class:${clean}`;
}

export function buildDmRoomId(userIdA: string, userIdB: string): string {
  const a = assertSafeChatIdentifier(userIdA);
  const b = assertSafeChatIdentifier(userIdB);
  if (a === b) {
    throw new Error("Không thể tạo phòng chat riêng với chính mình.");
  }
  const [first, second] = a < b ? [a, b] : [b, a];
  return `dm~${first}~${second}`;
}

export function parseChatRoomId(roomId: string): ParsedChatRoom | null {
  if (!roomId || typeof roomId !== "string") return null;
  if (roomId.startsWith("class:")) {
    const grade = roomId.slice("class:".length).trim();
    if (!grade) return null;
    return { kind: "class", grade };
  }
  if (roomId.startsWith("dm~")) {
    const parts = roomId.slice("dm~".length).split("~");
    if (parts.length !== 2 || !parts[0] || !parts[1] || parts[0] === parts[1]) {
      return null;
    }
    return { kind: "dm", participants: [parts[0], parts[1]] };
  }
  return null;
}

export function canAccessChatRoom(
  user: Pick<User, "id" | "role" | "grade" | "status"> | null | undefined,
  roomId: string
): boolean {
  if (!isActiveAccount(user) || !user?.id) return false;
  const parsed = parseChatRoomId(roomId);
  if (!parsed) return false;

  if (parsed.kind === "class") {
    if (isStaffRole(user.role)) return true;
    if (parsed.grade === "all") return true;
    return (user.grade || "").trim() === parsed.grade;
  }

  return parsed.participants[0] === user.id || parsed.participants[1] === user.id;
}

export function canCreateDmBetween(
  sender: Pick<User, "id" | "role" | "status"> | null | undefined,
  recipient: Pick<User, "id" | "role" | "status"> | null | undefined
): boolean {
  if (!isActiveAccount(sender) || !isActiveAccount(recipient)) return false;
  if (!sender?.id || !recipient?.id || sender.id === recipient.id) return false;
  // At least one side must be teacher/admin (1-on-1 private chat is between teacher and student, or staff)
  return isStaffRole(sender.role) || isStaffRole(recipient.role);
}

export function getDmPeerId(roomId: string, currentUserId: string): string | null {
  const parsed = parseChatRoomId(roomId);
  if (!parsed || parsed.kind !== "dm") return null;
  if (parsed.participants[0] === currentUserId) return parsed.participants[1];
  if (parsed.participants[1] === currentUserId) return parsed.participants[0];
  return null;
}

export function mergeChatMessages(
  existing: DirectChatMessage[],
  incoming: DirectChatMessage[],
  limit = MAX_CHAT_ROOM_MESSAGES
): DirectChatMessage[] {
  const map = new Map<string, DirectChatMessage>();
  for (const m of existing) {
    if (m && m.id) map.set(m.id, m);
  }
  for (const m of incoming) {
    if (m && m.id) map.set(m.id, m);
  }
  const sorted = Array.from(map.values()).sort((a, b) => {
    const diff = Date.parse(a.timestamp) - Date.parse(b.timestamp);
    if (!Number.isNaN(diff) && diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });
  return sorted.length > limit ? sorted.slice(sorted.length - limit) : sorted;
}

export function countUnreadMessages(
  messages: DirectChatMessage[],
  lastReadMs: number,
  currentUserId: string
): number {
  if (!messages || messages.length === 0) return 0;
  let count = 0;
  for (const msg of messages) {
    if (msg.senderId === currentUserId) continue;
    const ts = Date.parse(msg.timestamp);
    if (!Number.isNaN(ts) ? ts > lastReadMs : lastReadMs === 0) {
      count++;
    }
  }
  return count;
}

export interface ClassChannelDescriptor {
  roomId: string;
  grade: string;
  title: string;
  subtitle: string;
  studentCount?: number;
}

export function getVisibleClassChannels(currentUser: User, allUsers: User[]): ClassChannelDescriptor[] {
  const activeStudents = allUsers.filter(
    u => u.role === "student" && isActiveAccount(u)
  );
  const gradeCounts = new Map<string, number>();
  for (const st of activeStudents) {
    const g = (st.grade || "").trim();
    if (!g) continue;
    gradeCounts.set(g, (gradeCounts.get(g) || 0) + 1);
  }

  const channels: ClassChannelDescriptor[] = [
    {
      roomId: CLASS_ALL_ROOM_ID,
      grade: "all",
      title: "Thông báo & Trao đổi chung",
      subtitle: isStaffRole(currentUser.role)
        ? `Giáo viên · Toàn bộ ${activeStudents.length} học sinh`
        : "Giáo viên & Tất cả học sinh",
      studentCount: activeStudents.length,
    },
  ];

  if (isStaffRole(currentUser.role)) {
    const sortedGrades = Array.from(gradeCounts.keys()).sort((a, b) => a.localeCompare(b, "vi"));
    for (const g of sortedGrades) {
      const cnt = gradeCounts.get(g) || 0;
      channels.push({
        roomId: buildClassRoomId(g),
        grade: g,
        title: g,
        subtitle: `${cnt} học sinh`,
        studentCount: cnt,
      });
    }
  } else {
    const myGrade = (currentUser.grade || "").trim();
    if (myGrade) {
      const cnt = gradeCounts.get(myGrade) || 1;
      channels.push({
        roomId: buildClassRoomId(myGrade),
        grade: myGrade,
        title: myGrade,
        subtitle: `Lớp của bạn · ${cnt} học sinh`,
        studentCount: cnt,
      });
    }
  }

  return channels;
}

export function getVisibleDmPeers(
  currentUser: User,
  allUsers: User[],
  existingThreads: Record<string, DirectChatMessage[]> = {}
): User[] {
  const activeUsers = allUsers.filter(u => u.id !== currentUser.id && isActiveAccount(u));
  if (isStaffRole(currentUser.role)) {
    return activeUsers
      .filter(u => u.role === "student")
      .sort((a, b) => a.fullName.localeCompare(b.fullName, "vi"));
  }

  // Student sees all active teachers, plus any admin who has an active DM thread with them
  const teachers = activeUsers.filter(u => u.role === "teacher");
  const extraAdmins = activeUsers.filter(u => {
    if (u.role !== "admin") return false;
    try {
      const rid = buildDmRoomId(currentUser.id, u.id);
      return (existingThreads[rid]?.length || 0) > 0;
    } catch {
      return false;
    }
  });
  return [...teachers, ...extraAdmins].sort((a, b) => a.fullName.localeCompare(b.fullName, "vi"));
}
