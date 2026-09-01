import React, { useState, useEffect } from "react";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Server,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Code,
  Users,
  Award,
  X
} from "lucide-react";
import {
  getStoredSupabaseConfig,
  setCustomSupabaseConfig,
  clearCustomSupabaseConfig,
  testSupabaseConnection,
  isSupabaseConfigured
} from "../lib/supabase";
import {
  SUPABASE_SQL_SCHEMA,
  migrateAllDataToSupabase,
  MigrationProgress
} from "../services/supabaseMigration";
import { useApp } from "../context/AppContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSyncModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser } = useApp();
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState<MigrationProgress | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<"connect" | "schema" | "migrate">("connect");

  useEffect(() => {
    if (isOpen) {
      const config = getStoredSupabaseConfig();
      setSupabaseUrl(config.url);
      setSupabaseKey(config.anonKey);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
      setTestResult(res);
      if (res.success) {
        setCustomSupabaseConfig(supabaseUrl, supabaseKey);
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "Lỗi không xác định" });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = () => {
    setCustomSupabaseConfig(supabaseUrl, supabaseKey);
    handleTestConnection();
  };

  const handleClearConfig = () => {
    clearCustomSupabaseConfig();
    setSupabaseUrl("");
    setSupabaseKey("");
    setTestResult(null);
    setMigrationProgress(null);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const handleRunMigration = async () => {
    if (!isSupabaseConfigured() && (!supabaseUrl || !supabaseKey)) {
      setTestResult({
        success: false,
        message: "Vui lòng nhập và kiểm tra kết nối Supabase trước khi chuyển dữ liệu."
      });
      setActiveTab("connect");
      return;
    }

    // Save credentials first
    setCustomSupabaseConfig(supabaseUrl, supabaseKey);
    setIsMigrating(true);

    try {
      const res = await migrateAllDataToSupabase(currentUser, (p) => {
        setMigrationProgress(p);
      });
      if (res.success) {
        setTestResult({ success: true, message: res.message });
      } else {
        setTestResult({ success: false, message: res.message });
      }
    } catch (e: any) {
      setTestResult({ success: false, message: e.message || "Lỗi chuyển dữ liệu" });
    } finally {
      setIsMigrating(false);
    }
  };

  const isConnected = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">Trung Tâm CSDL Supabase (PostgreSQL)</h2>
                {isConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Đã kết nối
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Chế độ Local/SQLite
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Chuyển toàn bộ hồ sơ, bài học, 120+ đề thuật toán, bài nộp sang Supabase Cloud</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-800 bg-slate-900/60 flex gap-2">
          <button
            onClick={() => setActiveTab("connect")}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "connect"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Server className="w-4 h-4" />
            1. Cấu hình & Kết nối
          </button>

          <button
            onClick={() => setActiveTab("schema")}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "schema"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="w-4 h-4" />
            2. Script Tạo Bảng (SQL Schema)
          </button>

          <button
            onClick={() => setActiveTab("migrate")}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "migrate"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4" />
            3. Chuyển Toàn Bộ Dữ Liệu (1-Click)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: CONNECT */}
          {activeTab === "connect" && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Hướng dẫn lấy thông tin kết nối Supabase
                </div>
                <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Truy cập <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Supabase Dashboard</a> và chọn dự án của bạn.</li>
                  <li>Vào <strong>Project Settings $\rightarrow$ Data API</strong> (hoặc API).</li>
                  <li>Copy <strong>Project URL</strong> và <strong>anon / public API Key</strong> dán vào 2 ô bên dưới.</li>
                </ol>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Supabase Project URL
                  </label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzabcdefghijklmno.supabase.co"
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Supabase Anon / Public API Key
                  </label>
                  <input
                    type="password"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-4 rounded-xl border flex flex-col gap-3 ${
                    testResult.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {testResult.success ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs leading-relaxed flex-1">
                      <p className="font-semibold">{testResult.success ? "Kết nối thông suốt!" : "Thông báo kết nối:"}</p>
                      <p className="mt-0.5">{testResult.message}</p>
                    </div>
                  </div>

                  {testResult.success && (
                    <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab("schema")}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Chuyển sang Bước 2: Xem & Copy Script SQL</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href="https://supabase.com/dashboard/project/_/sql"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-300 hover:text-emerald-200 underline flex items-center gap-1"
                      >
                        Mở Supabase SQL Editor $\rightarrow$
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleSaveConfig}
                  disabled={isTesting || !supabaseUrl || !supabaseKey}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Đang kiểm tra kết nối...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Lưu & Kiểm tra kết nối
                    </>
                  )}
                </button>

                {isConnected && (
                  <button
                    onClick={handleClearConfig}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  >
                    Ngắt kết nối Supabase
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("schema")}
                  className="ml-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Sang Bước 2: Script SQL
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA */}
          {activeTab === "schema" && (
            <div className="space-y-4">
              {/* Step instructions */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  Hướng dẫn 3 bước tạo bảng trên Supabase (Khắc phục lỗi schema cache):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400">1. Sao chép SQL:</span>
                    <p className="text-slate-300 text-[11px]">Bấm nút xanh <strong>"Sao chép toàn bộ SQL"</strong> ở bên dưới.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400">2. Dán vào Supabase:</span>
                    <p className="text-slate-300 text-[11px]">Vào <a href="https://supabase.com/dashboard/project/_/sql" target="_blank" rel="noreferrer" className="text-sky-300 underline font-semibold">SQL Editor</a>, bấm <strong>New query</strong> và dán vào.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400">3. Chạy lệnh (Run):</span>
                    <p className="text-slate-300 text-[11px]">Bấm nút <strong>Run</strong> (xanh lá) để tạo 12 bảng và kích hoạt RLS.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">PostgreSQL DDL Schema Script (12 Bảng & RLS)</h3>
                  <p className="text-xs text-slate-400">
                    Bao gồm cấu trúc bảng users, 120+ thuật toán, nhóm học, điểm số, và ghi chú.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySchema}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
                  >
                    {copiedSchema ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        Đã sao chép vào Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Sao chép toàn bộ SQL
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("migrate")}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Sang Bước 3: Chuyển dữ liệu
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[320px] leading-relaxed select-all">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: MIGRATE DATA */}
          {activeTab === "migrate" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-1">
                    <Users className="w-4 h-4" />
                    Hồ sơ & Học sinh
                  </div>
                  <div className="text-lg font-bold text-slate-100">4+ tài khoản</div>
                  <div className="text-[11px] text-slate-400">XP, Chuỗi học, Avatar</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                    <Code className="w-4 h-4" />
                    Đề bài Thuật toán
                  </div>
                  <div className="text-lg font-bold text-slate-100">120+ bài tập</div>
                  <div className="text-[11px] text-slate-400">10 Chủ đề & Test cases</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold mb-1">
                    <BookOpen className="w-4 h-4" />
                    Nhóm & Thảo luận
                  </div>
                  <div className="text-lg font-bold text-slate-100">4 Nhóm học</div>
                  <div className="text-[11px] text-slate-400">Bài ghim, Tin nhắn code</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                    <Award className="w-4 h-4" />
                    Ghi chú & Bài nộp
                  </div>
                  <div className="text-lg font-bold text-slate-100">Toàn bộ lịch sử</div>
                  <div className="text-[11px] text-slate-400">Điểm số & Lời giải</div>
                </div>
              </div>

              {/* Progress Card */}
              {migrationProgress && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 flex items-center gap-2">
                      {isMigrating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      {migrationProgress.stage}
                    </span>
                    <span className="font-mono font-bold text-slate-300">{migrationProgress.percent}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                      style={{ width: `${migrationProgress.percent}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-400">{migrationProgress.details}</p>

                  {migrationProgress.counts && migrationProgress.percent === 100 && (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-300">
                      <span>👤 Đã chuyển: <strong>{migrationProgress.counts.users}</strong> người dùng</span>
                      <span>💡 <strong>{migrationProgress.counts.problems}</strong> đề bài</span>
                      <span>👥 <strong>{migrationProgress.counts.groups}</strong> nhóm học</span>
                      <span>📝 <strong>{migrationProgress.counts.notes}</strong> ghi chú</span>
                      <span>🎯 <strong>{migrationProgress.counts.submissions}</strong> bài nộp</span>
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-slate-200">Cơ chế an toàn (Safe Upsert):</p>
                  <p>
                    Quá trình đồng bộ sử dụng lệnh <code>UPSERT</code> không làm mất dữ liệu đã có trên Supabase. Nếu đã có bảng, dữ liệu sẽ được cập nhật phiên bản mới nhất.
                  </p>
                </div>
              </div>

              {/* Error banner in Tab 3 if table not found */}
              {migrationProgress && !migrationProgress.success && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-300">Chưa tạo bảng dữ liệu trên Supabase!</p>
                      <p className="mt-1 text-slate-300 leading-relaxed">{migrationProgress.details}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-500/20 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab("schema")}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Code className="w-3.5 h-3.5" />
                      Sang Bước 2: Lấy Script SQL tạo bảng
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="https://supabase.com/dashboard/project/_/sql"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      Mở Supabase SQL Editor $\rightarrow$
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleRunMigration}
                  disabled={isMigrating}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  {isMigrating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Đang đồng bộ dữ liệu lên Supabase...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Bắt đầu chuyển toàn bộ dữ liệu sang Supabase
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("schema")}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Xem lại Script SQL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            PyEdu Supabase Data Engine v2.0
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
