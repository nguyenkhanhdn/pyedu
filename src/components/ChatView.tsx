import React, { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { DirectChatMessage, GROUP_MESSAGE_MAX_LENGTH, User } from "../types";
import {
  buildDmRoomId,
  canAccessChatRoom,
  CLASS_ALL_ROOM_ID,
  countUnreadMessages,
  getDmPeerId,
  getVisibleClassChannels,
  getVisibleDmPeers,
  isStaffRole,
  parseChatRoomId,
} from "../utils/chatRooms";
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Lock,
  MessageCircle,
  MessagesSquare,
  Pin,
  RefreshCw,
  Search,
  Send,
  Users,
} from "lucide-react";

type ChatCategoryTab = "class" | "dm";

function formatShortTime(ts: string): string {
  const ms = Date.parse(ts);
  if (Number.isNaN(ms)) return "";
  const d = new Date(ms);
  const now = new Date();
  const sameDay =
    d.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) ===
    now.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  if (sameDay) {
    return d.toLocaleTimeString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
  });
}

function formatFullTime(ts: string): string {
  const ms = Date.parse(ts);
  if (Number.isNaN(ms)) return ts;
  return new Date(ms).toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const ChatView: React.FC = () => {
  const {
    currentUser,
    allUsers,
    chatThreads,
    chatReadTimestamps,
    chatConnectionStatus,
    selectedChatRoomId,
    setSelectedChatRoomId,
    refreshChatThreads,
    refreshChatRoom,
    sendDirectChatMessage,
    markChatRoomRead,
    togglePinClassChatMessage,
  } = useApp();

  const initialCategory: ChatCategoryTab = selectedChatRoomId?.startsWith("dm~") ? "dm" : "class";
  const [categoryTab, setCategoryTab] = useState<ChatCategoryTab>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [mobileShowThread, setMobileShowThread] = useState(Boolean(selectedChatRoomId?.startsWith("dm~")));

  const [messageText, setMessageText] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [pinAnnouncement, setPinAnnouncement] = useState(false);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sendError, setSendError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [clock, setClock] = useState(Date.now());

  const pendingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => {
      const now = Date.now();
      setClock(now);
      if (now >= cooldownUntil) setCooldownUntil(0);
    }, 250);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const remaining = Math.max(0, Math.ceil((cooldownUntil - clock) / 1000));

  useEffect(() => {
    if (selectedChatRoomId?.startsWith("dm~")) {
      setCategoryTab("dm");
      setMobileShowThread(true);
    } else if (selectedChatRoomId?.startsWith("class:")) {
      setCategoryTab("class");
    }
  }, [selectedChatRoomId]);

  const classChannels = useMemo(() => {
    if (!currentUser) return [];
    return getVisibleClassChannels(currentUser, allUsers);
  }, [currentUser, allUsers]);

  const dmPeers = useMemo(() => {
    if (!currentUser) return [];
    return getVisibleDmPeers(currentUser, allUsers, chatThreads);
  }, [currentUser, allUsers, chatThreads]);

  const studentGrades = useMemo(() => {
    if (!currentUser || !isStaffRole(currentUser.role)) return [];
    const grades = new Set<string>();
    for (const peer of dmPeers) {
      const g = (peer.grade || "").trim();
      if (g) grades.add(g);
    }
    return Array.from(grades).sort((a, b) => a.localeCompare(b, "vi"));
  }, [currentUser, dmPeers]);

  // Ensure selectedChatRoomId stays valid & accessible
  const activeRoomId = useMemo(() => {
    if (!currentUser) return CLASS_ALL_ROOM_ID;
    if (selectedChatRoomId && canAccessChatRoom(currentUser, selectedChatRoomId)) {
      return selectedChatRoomId;
    }
    return classChannels[0]?.roomId || CLASS_ALL_ROOM_ID;
  }, [currentUser, selectedChatRoomId, classChannels]);

  useEffect(() => {
    if (currentUser && activeRoomId && canAccessChatRoom(currentUser, activeRoomId)) {
      void refreshChatRoom(activeRoomId);
    }
  }, [currentUser?.id, activeRoomId]);

  const activeMessages: DirectChatMessage[] = useMemo(() => {
    return chatThreads[activeRoomId] || [];
  }, [chatThreads, activeRoomId]);

  // Mark open room as read whenever thread updates while visible
  useEffect(() => {
    if (!currentUser || !activeRoomId) return;
    const unread = countUnreadMessages(activeMessages, chatReadTimestamps[activeRoomId] || 0, currentUser.id);
    if (unread > 0 || !chatReadTimestamps[activeRoomId]) {
      void markChatRoomRead(activeRoomId);
    }
  }, [activeRoomId, activeMessages.length, currentUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeRoomId, activeMessages.length]);

  if (!currentUser) return null;

  const isStaff = isStaffRole(currentUser.role);
  const parsedActive = parseChatRoomId(activeRoomId);
  const activePeer: User | undefined =
    parsedActive?.kind === "dm"
      ? allUsers.find(u => u.id === getDmPeerId(activeRoomId, currentUser.id))
      : undefined;
  const activeClassChannel =
    parsedActive?.kind === "class"
      ? classChannels.find(c => c.roomId === activeRoomId)
      : undefined;

  const classUnreadTotal = classChannels.reduce((sum, ch) => {
    const msgs = chatThreads[ch.roomId] || [];
    return sum + countUnreadMessages(msgs, chatReadTimestamps[ch.roomId] || 0, currentUser.id);
  }, 0);

  const dmUnreadTotal = dmPeers.reduce((sum, peer) => {
    try {
      const rid = buildDmRoomId(currentUser.id, peer.id);
      const msgs = chatThreads[rid] || [];
      return sum + countUnreadMessages(msgs, chatReadTimestamps[rid] || 0, currentUser.id);
    } catch {
      return sum;
    }
  }, 0);

  const filteredClassChannels = classChannels.filter(ch => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return ch.title.toLowerCase().includes(q) || ch.subtitle.toLowerCase().includes(q);
  });

  const sortedFilteredPeers = dmPeers
    .filter(peer => {
      if (isStaff && gradeFilter !== "all" && (peer.grade || "").trim() !== gradeFilter) return false;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        peer.fullName.toLowerCase().includes(q) ||
        peer.username.toLowerCase().includes(q) ||
        (peer.grade || "").toLowerCase().includes(q)
      );
    })
    .map(peer => {
      const roomId = buildDmRoomId(currentUser.id, peer.id);
      const msgs = chatThreads[roomId] || [];
      const lastMsg = msgs[msgs.length - 1];
      const unread = countUnreadMessages(msgs, chatReadTimestamps[roomId] || 0, currentUser.id);
      const lastTs = lastMsg ? Date.parse(lastMsg.timestamp) || 0 : 0;
      return { peer, roomId, lastMsg, unread, lastTs };
    })
    .sort((a, b) => {
      if ((b.unread > 0 ? 1 : 0) !== (a.unread > 0 ? 1 : 0)) {
        return (b.unread > 0 ? 1 : 0) - (a.unread > 0 ? 1 : 0);
      }
      if (b.lastTs !== a.lastTs) return b.lastTs - a.lastTs;
      return a.peer.fullName.localeCompare(b.peer.fullName, "vi");
    });

  const pinnedMessages = parsedActive?.kind === "class" ? activeMessages.filter(m => m.pinned) : [];
  const latestPinned = pinnedMessages[pinnedMessages.length - 1];

  const selectRoom = (roomId: string) => {
    setSendError("");
    setSelectedChatRoomId(roomId);
    setMobileShowThread(true);
    void markChatRoomRead(roomId);
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refreshChatThreads(), refreshChatRoom(activeRoomId)]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (pendingRef.current || remaining > 0) return;
    if (!messageText.trim() && !codeSnippet.trim()) return;

    pendingRef.current = true;
    setSending(true);
    setSendError("");
    try {
      await sendDirectChatMessage(
        activeRoomId,
        messageText.trim(),
        codeSnippet.trim() || undefined,
        parsedActive?.kind === "class" && isStaff ? pinAnnouncement : false
      );
      setMessageText("");
      setCodeSnippet("");
      setShowCodeInput(false);
      setPinAnnouncement(false);
      if (currentUser.role === "student") {
        setClock(Date.now());
        setCooldownUntil(Date.now() + 5000);
      }
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Chưa gửi được tin nhắn. Vui lòng thử lại.");
    } finally {
      pendingRef.current = false;
      setSending(false);
    }
  };

  const handleCopyCode = async (msgId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(prev => (prev === msgId ? null : prev)), 1500);
    } catch {}
  };

  const connectionLabel =
    chatConnectionStatus === "live"
      ? "Trực tuyến"
      : chatConnectionStatus === "connecting"
        ? "Đang kết nối..."
        : chatConnectionStatus === "reconnecting"
          ? "Đang kết nối lại..."
          : "Lưu cục bộ";

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 text-slate-900">
      {/* Left Conversation Sidebar */}
      <aside
        className={`${
          mobileShowThread ? "hidden md:flex" : "flex"
        } w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex-col h-full`}
      >
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-base text-slate-900">Trao đổi Lớp học</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span
                className={`h-2 w-2 rounded-full ${
                  chatConnectionStatus === "live"
                    ? "bg-emerald-500"
                    : chatConnectionStatus === "connecting" || chatConnectionStatus === "reconnecting"
                      ? "bg-amber-400"
                      : "bg-slate-400"
                }`}
              />
              <span>{connectionLabel}</span>
            </div>
          </div>

          {/* Mode Tabs: Chat Lớp vs Chat Riêng 1-1 */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setCategoryTab("class");
                if (!selectedChatRoomId?.startsWith("class:")) {
                  setSelectedChatRoomId(classChannels[0]?.roomId || CLASS_ALL_ROOM_ID);
                }
              }}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                categoryTab === "class"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Chat lớp</span>
              {classUnreadTotal > 0 && (
                <span className="tabular-nums px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                  {classUnreadTotal}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryTab("dm");
                if (!selectedChatRoomId?.startsWith("dm~") && sortedFilteredPeers[0]) {
                  setSelectedChatRoomId(sortedFilteredPeers[0].roomId);
                }
              }}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                categoryTab === "dm"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{isStaff ? "Chat riêng HS" : "Chat riêng GV"}</span>
              {dmUnreadTotal > 0 && (
                <span className="tabular-nums px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                  {dmUnreadTotal}
                </span>
              )}
            </button>
          </div>

          {/* Search & Grade filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={
                  categoryTab === "class"
                    ? "Tìm kênh lớp..."
                    : isStaff
                      ? "Tìm học sinh theo tên, @username..."
                      : "Tìm giáo viên..."
                }
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            {categoryTab === "dm" && isStaff && studentGrades.length > 0 && (
              <select
                aria-label="Lọc học sinh theo lớp"
                value={gradeFilter}
                onChange={e => setGradeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">Tất cả lớp ({dmPeers.length} học sinh)</option>
                {studentGrades.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {categoryTab === "class" ? (
            filteredClassChannels.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">Không tìm thấy kênh lớp phù hợp.</div>
            ) : (
              filteredClassChannels.map(ch => {
                const msgs = chatThreads[ch.roomId] || [];
                const lastMsg = msgs[msgs.length - 1];
                const unread = countUnreadMessages(msgs, chatReadTimestamps[ch.roomId] || 0, currentUser.id);
                const selected = activeRoomId === ch.roomId;
                return (
                  <button
                    key={ch.roomId}
                    type="button"
                    onClick={() => selectRoom(ch.roomId)}
                    className={`w-full px-4 py-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      selected ? "bg-indigo-50/90" : "hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                        ch.roomId === CLASS_ALL_ROOM_ID
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {ch.roomId === CLASS_ALL_ROOM_ID ? <MessagesSquare className="h-5 w-5" /> : ch.title.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${selected || unread > 0 ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                          {ch.title}
                        </span>
                        {lastMsg && (
                          <span className="text-[11px] text-slate-400 tabular-nums shrink-0">
                            {formatShortTime(lastMsg.timestamp)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className={`text-xs truncate ${unread > 0 ? "font-semibold text-slate-700" : "text-slate-500"}`}>
                          {lastMsg
                            ? `${lastMsg.senderId === currentUser.id ? "Bạn: " : `${lastMsg.senderName}: `}${lastMsg.content || "[Mã nguồn Python]"}`
                            : ch.subtitle}
                        </p>
                        {unread > 0 && (
                          <span className="tabular-nums px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full shrink-0">
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )
          ) : sortedFilteredPeers.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              {isStaff ? "Chưa có học sinh nào phù hợp bộ lọc." : "Hiện chưa có giáo viên nào khả dụng để nhắn riêng."}
            </div>
          ) : (
            sortedFilteredPeers.map(({ peer, roomId, lastMsg, unread }) => {
              const selected = activeRoomId === roomId;
              return (
                <button
                  key={roomId}
                  type="button"
                  onClick={() => selectRoom(roomId)}
                  className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    selected ? "bg-indigo-50/90" : "hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={peer.avatar}
                    alt={peer.fullName}
                    className="h-10 w-10 rounded-full bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm truncate ${selected || unread > 0 ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                        {peer.fullName}
                      </span>
                      {lastMsg && (
                        <span className="text-[11px] text-slate-400 tabular-nums shrink-0">
                          {formatShortTime(lastMsg.timestamp)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {peer.role === "teacher" ? "Giáo viên" : peer.grade || "Chưa có lớp"} · @{peer.username}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className={`text-xs truncate ${unread > 0 ? "font-semibold text-slate-800" : "text-slate-500"}`}>
                        {lastMsg
                          ? `${lastMsg.senderId === currentUser.id ? "Bạn: " : ""}${lastMsg.content || "[Mã nguồn Python]"}`
                          : "Nhắn tin riêng 1-1"}
                      </p>
                      {unread > 0 && (
                        <span className="tabular-nums px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full shrink-0">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* Right Active Conversation Thread */}
      <section
        className={`${
          mobileShowThread ? "flex" : "hidden md:flex"
        } flex-1 flex-col h-full overflow-hidden bg-slate-50`}
      >
        {/* Thread Header */}
        <header className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileShowThread(false)}
              className="md:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Quay lại danh sách"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {activePeer ? (
              <img
                src={activePeer.avatar}
                alt={activePeer.fullName}
                className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 shrink-0"
              />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">
                  {activePeer ? activePeer.fullName : activeClassChannel?.title || "Trao đổi lớp"}
                </h3>
                {activePeer && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 whitespace-nowrap">
                    <Lock className="h-3 w-3" /> Riêng tư 1-1
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 truncate">
                {activePeer
                  ? `${activePeer.role === "teacher" ? "Giáo viên" : activePeer.grade || "Học sinh"} · @${activePeer.username}`
                  : activeClassChannel?.subtitle || "Kênh trao đổi giữa giáo viên và lớp"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Tải lại</span>
          </button>
        </header>

        {/* Pinned Teacher Announcement Banner for Class Chat */}
        {latestPinned && (
          <div className="mx-4 mt-3 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <Pin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs min-w-0">
                <p className="font-bold text-amber-900">
                  Thông báo đã ghim · {latestPinned.senderName}
                </p>
                <p className="text-amber-900/90 mt-0.5 whitespace-pre-wrap break-words">
                  {latestPinned.content || "[Đính kèm mã nguồn Python]"}
                </p>
              </div>
            </div>
            {isStaff && (
              <button
                type="button"
                onClick={() => togglePinClassChatMessage(activeRoomId, latestPinned.id)}
                className="text-[11px] font-semibold text-amber-800 hover:underline shrink-0 cursor-pointer whitespace-nowrap"
              >
                Bỏ ghim
              </button>
            )}
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {activeMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-12 text-slate-500">
              <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-indigo-600">
                {activePeer ? <Lock className="h-5 w-5" /> : <MessagesSquare className="h-5 w-5" />}
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {activePeer
                  ? `Bắt đầu trò chuyện riêng với ${activePeer.fullName}`
                  : `Chưa có tin nhắn trong ${activeClassChannel?.title || "kênh lớp"}`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {activePeer
                  ? "Nội dung trao đổi được bảo mật riêng tư giữa hai người, hỗ trợ gửi câu hỏi và đoạn code Python."
                  : "Giáo viên có thể gửi thông báo lớp, còn học sinh có thể hỏi bài ngay tại đây."}
              </p>
            </div>
          ) : (
            activeMessages.map(msg => {
              const isOwn = msg.senderId === currentUser.id;
              const senderIsStaff = isStaffRole(msg.senderRole);
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  {!isOwn && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 shrink-0 mt-1"
                    />
                  )}

                  <div className={`max-w-[85%] sm:max-w-[72%] space-y-1 ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`flex items-center gap-2 px-1 text-[11px] ${isOwn ? "flex-row-reverse" : ""}`}>
                      <span className="font-semibold text-slate-700">
                        {isOwn ? "Bạn" : msg.senderName}
                      </span>
                      {senderIsStaff && (
                        <span className="font-semibold text-amber-700">Giáo viên</span>
                      )}
                      <span className="text-slate-400 tabular-nums">{formatFullTime(msg.timestamp)}</span>
                      {msg.pinned && (
                        <span className="inline-flex items-center gap-0.5 text-amber-700 font-semibold">
                          <Pin className="h-3 w-3" /> Đã ghim
                        </span>
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isOwn
                          ? "bg-indigo-600 text-white rounded-tr-sm"
                          : senderIsStaff && parsedActive?.kind === "class"
                            ? "bg-amber-50/70 border border-amber-200 text-slate-900 rounded-tl-sm"
                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                      }`}
                    >
                      {msg.content && (
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      )}

                      {msg.codeSnippet && (
                        <div className="mt-2 rounded-xl bg-slate-900 border border-slate-800 p-2.5 font-mono text-xs text-emerald-300 overflow-x-auto">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-1.5">
                            <span className="flex items-center gap-1">
                              <Code2 className="h-3 w-3" /> Python
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(msg.id, msg.codeSnippet!)}
                              className="inline-flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
                            >
                              {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedId === msg.id ? "Đã chép" : "Sao chép"}</span>
                            </button>
                          </div>
                          <pre className="whitespace-pre">{msg.codeSnippet}</pre>
                        </div>
                      )}
                    </div>

                    {isStaff && parsedActive?.kind === "class" && (
                      <button
                        type="button"
                        onClick={() => togglePinClassChatMessage(activeRoomId, msg.id)}
                        className="px-1 text-[11px] text-slate-400 hover:text-amber-700 cursor-pointer"
                      >
                        {msg.pinned ? "Bỏ ghim" : "Ghim lên lớp"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Composer */}
        <footer className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="space-y-2">
            {sendError && (
              <p role="alert" className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl">
                {sendError}
              </p>
            )}
            {remaining > 0 && (
              <p role="status" className="text-xs text-amber-700">
                Vui lòng chờ {remaining} giây trước khi gửi tin tiếp theo.
              </p>
            )}

            {showCodeInput && (
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
                <label className="block text-[11px] font-mono text-indigo-300 font-semibold">
                  Đính kèm đoạn mã Python:
                </label>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  disabled={sending}
                  maxLength={GROUP_MESSAGE_MAX_LENGTH}
                  onChange={e => setCodeSnippet(e.target.value.slice(0, GROUP_MESSAGE_MAX_LENGTH))}
                  placeholder="Dán đoạn code Python muốn hỏi hoặc hướng dẫn..."
                  className="w-full bg-transparent font-mono text-xs text-emerald-300 focus:outline-none resize-none"
                />
                <div className={`text-right text-[10px] font-mono tabular-nums ${codeSnippet.length >= GROUP_MESSAGE_MAX_LENGTH ? "text-rose-400" : "text-slate-400"}`}>
                  {codeSnippet.length}/{GROUP_MESSAGE_MAX_LENGTH}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              {isStaff && parsedActive?.kind === "class" ? (
                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none text-amber-800 font-medium">
                  <input
                    type="checkbox"
                    checked={pinAnnouncement}
                    onChange={e => setPinAnnouncement(e.target.checked)}
                    className="h-3.5 w-3.5 accent-amber-600"
                  />
                  <span>Ghim thông báo đầu lớp</span>
                </label>
              ) : (
                <span className="text-[11px]">
                  {activePeer
                    ? `Tin nhắn riêng tư với ${activePeer.fullName}`
                    : "Enter để gửi · Shift+Enter xuống dòng"}
                </span>
              )}
              {messageText.length >= GROUP_MESSAGE_MAX_LENGTH * 0.8 && (
                <span className="text-[11px] font-mono tabular-nums">
                  {messageText.length}/{GROUP_MESSAGE_MAX_LENGTH}
                </span>
              )}
            </div>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => setShowCodeInput(v => !v)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  showCodeInput
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
                title="Đính kèm đoạn mã Python"
              >
                <Code2 className="h-4 w-4" />
                <span className="hidden sm:inline">Code</span>
              </button>

              <textarea
                rows={1}
                value={messageText}
                disabled={sending}
                maxLength={GROUP_MESSAGE_MAX_LENGTH}
                onChange={e => setMessageText(e.target.value.slice(0, GROUP_MESSAGE_MAX_LENGTH))}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder={
                  activePeer
                    ? `Nhắn riêng cho ${activePeer.fullName}...`
                    : "Nhập tin nhắn trao đổi với lớp..."
                }
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 resize-none max-h-28"
              />

              <button
                type="submit"
                disabled={sending || remaining > 0 || (!messageText.trim() && !codeSnippet.trim())}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {sending ? "Đang gửi..." : remaining > 0 ? `Chờ ${remaining}s` : "Gửi"}
                </span>
              </button>
            </div>
          </form>
        </footer>
      </section>
    </div>
  );
};
