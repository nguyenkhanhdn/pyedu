export const CHAT_COOLDOWN_MS = 5000;
export const CHAT_WINDOW_MS = 60000;
export const CHAT_MAX_PER_MINUTE = 10;
export const normalizeChatText = (value: string) => (value || "").trim().replace(/\s+/g, " ");

export function assertChatAllowed(role: string, recent: { timestamp: string; content: string; codeSnippet?: string }[], content: string, codeSnippet = "", now = Date.now()) {
  if (!content.trim() && !codeSnippet.trim()) throw new Error("Tin nhắn không được để trống.");
  if (content.length > 1000 || codeSnippet.length > 1000) throw new Error("Nội dung và mã nguồn tối đa 1000 ký tự mỗi phần.");
  if (role === "teacher" || role === "admin") return;
  if (role !== "student") throw new Error("Tài khoản không được phép gửi tin nhắn.");
  const window = recent.filter(message => Date.parse(message.timestamp) > now - CHAT_WINDOW_MS);
  if (window.some(message => Date.parse(message.timestamp) > now - CHAT_COOLDOWN_MS)) throw new Error("Vui lòng chờ ít nhất 5 giây giữa hai tin nhắn.");
  if (window.length >= CHAT_MAX_PER_MINUTE) throw new Error("Bạn đã gửi 10 tin trong một phút. Hãy chờ rồi gửi tiếp.");
  if (window.some(message => normalizeChatText(message.content).toLowerCase() === normalizeChatText(content).toLowerCase() && normalizeChatText(message.codeSnippet || "") === normalizeChatText(codeSnippet))) throw new Error("Bạn vừa gửi nội dung này. Vui lòng chờ 60 giây trước khi gửi lại.");
}
