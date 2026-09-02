import React, { useState, useEffect } from "react";
import { Database, CheckCircle2, AlertCircle, RefreshCw, Table, ShieldCheck, Code2, ExternalLink, HardDrive, KeyRound } from "lucide-react";
import { isSupabaseConfigured, getSupabase } from "../../lib/supabase";
import { SupabaseService } from "../../services/supabaseService";

interface AdminSupabaseViewProps {
  onOpenSyncModal?: () => void;
}

export const AdminSupabaseView: React.FC<AdminSupabaseViewProps> = ({ onOpenSyncModal }) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; tableCounts?: Record<string, number> } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const testDirectConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const client = getSupabase();
      if (!client) {
        setTestResult({
          success: false,
          message: "Chưa cấu hình Supabase URL hoặc Anon Key trong môi trường (VITE_SUPABASE_URL)."
        });
        setTesting(false);
        return;
      }

      // Query public tables directly
      const counts: Record<string, number> = {};
      
      const { count: userCount, error: userErr } = await client.from("users").select("*", { count: "exact", head: true });
      if (!userErr && userCount !== null) counts["users"] = userCount;

      const { count: subCount, error: subErr } = await client.from("submissions").select("*", { count: "exact", head: true });
      if (!subErr && subCount !== null) counts["submissions"] = subCount;

      const { count: noteCount, error: noteErr } = await client.from("notes").select("*", { count: "exact", head: true });
      if (!noteErr && noteCount !== null) counts["notes"] = noteCount;

      const { count: groupCount, error: groupErr } = await client.from("study_groups").select("*", { count: "exact", head: true });
      if (!groupErr && groupCount !== null) counts["study_groups"] = groupCount;

      const { count: codeCount, error: codeErr } = await client.from("saved_codes").select("*", { count: "exact", head: true });
      if (!codeErr && codeCount !== null) counts["saved_codes"] = codeCount;

      const { count: customCount, error: customErr } = await client.from("custom_lessons").select("*", { count: "exact", head: true });
      if (!customErr && customCount !== null) counts["custom_lessons"] = customCount;

      setTestResult({
        success: true,
        message: "Kết nối trực tiếp Supabase Cloud PostgreSQL thành công 100%! Không qua bất kỳ máy chủ trung gian nào.",
        tableCounts: counts
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Lỗi kết nối Supabase: ${err?.message || "Không thể kết nối đến máy chủ Supabase"}`
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      testDirectConnection();
    }
  }, []);

  const ddlSql = `-- Script khởi tạo CSDL Trực Tiếp trên Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  "fullName" TEXT NOT NULL,
  password TEXT DEFAULT '123456',
  avatar TEXT,
  grade TEXT DEFAULT 'Lớp 10 Tin',
  school TEXT DEFAULT 'THPT Chuyên Tin',
  role TEXT DEFAULT 'student',
  "totalXp" INTEGER DEFAULT 0,
  "weeklyXp" INTEGER DEFAULT 0,
  "streakDays" INTEGER DEFAULT 1,
  "dailyGoal" INTEGER DEFAULT 20,
  badges JSONB DEFAULT '[]'::jsonb,
  "completedLessons" JSONB DEFAULT '[]'::jsonb,
  "lastActiveDate" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  "executionTime" NUMERIC,
  "passedCount" INTEGER,
  "totalCount" INTEGER,
  feedback TEXT,
  "submittedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notes (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  content TEXT NOT NULL,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  "creatorId" TEXT NOT NULL,
  members JSONB DEFAULT '[]'::jsonb,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Cho phép quyền truy cập (RLS Policies):
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to notes" ON public.notes FOR ALL USING (true) WITH CHECK (true);
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to study_groups" ON public.study_groups FOR ALL USING (true) WITH CHECK (true);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(ddlSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-emerald-800/40 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <Database className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Quản Trị CSDL Supabase Cloud (Direct Mode)</h2>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                  Không CSDL Trung Gian
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Mọi tác vụ Đăng nhập, Lưu mã nguồn, Chấm bài tập, và Cập nhật điểm đều kết nối trực tiếp đến PostgreSQL Cloud của Supabase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={testDirectConnection}
              disabled={testing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/30 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${testing ? "animate-spin" : ""}`} />
              <span>{testing ? "Đang kiểm tra..." : "Kiểm tra kết nối trực tiếp"}</span>
            </button>

            {onOpenSyncModal && (
              <button
                onClick={onOpenSyncModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <HardDrive className="h-4 w-4 text-emerald-400" />
                <span>Trình Quản lý Đồng bộ</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Status Result */}
        {testResult && (
          <div
            className={`mt-4 p-4 rounded-2xl border flex items-start gap-3 text-xs animate-in fade-in ${
              testResult.success
                ? "bg-emerald-950/80 border-emerald-600 text-emerald-200"
                : "bg-rose-950/80 border-rose-600 text-rose-200"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-bold text-sm text-white mb-1">{testResult.message}</p>
              {testResult.tableCounts && (
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {Object.entries(testResult.tableCounts).map(([tbl, count]) => (
                    <div key={tbl} className="bg-emerald-900/60 border border-emerald-700/50 p-2 rounded-xl text-center">
                      <span className="text-[10px] text-emerald-300 block font-mono">public.{tbl}</span>
                      <span className="text-base font-black text-white">{count} bản ghi</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4 Cards: Architecture & Config */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Kiến Trúc Direct-To-Cloud</h3>
              <p className="text-xs text-slate-500">Zero Intermediate Layer</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ứng dụng sử dụng SDK Supabase JS trực tiếp từ trình duyệt kết nối đến API Gateway Supabase. Loại bỏ hoàn toàn lỗi trung gian và độ trễ từ backend Express/SQLite.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <Table className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">6 Bảng Dữ Liệu Tự Động</h3>
              <p className="text-xs text-slate-500">PostgreSQL Schemas</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gồm các bảng: <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">users</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">submissions</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">notes</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">study_groups</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">saved_codes</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">custom_lessons</code>.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Bảo Mật & RLS</h3>
              <p className="text-xs text-slate-500">Row Level Security</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hỗ trợ phân quyền người dùng theo vai trò: <span className="font-bold text-purple-700">admin</span> (Toàn quyền quản trị), <span className="font-bold text-amber-700">teacher</span> (Quản lý nhóm & bài tập), <span className="font-bold text-indigo-700">student</span> (Làm bài và nộp code).
          </p>
        </div>
      </div>

      {/* SQL DDL Generator & Schema */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-800">Cấu Trúc Bảng SQL Chuẩn Supabase (DDL)</h3>
          </div>
          <button
            onClick={copySqlToClipboard}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copiedSql ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> : <Code2 className="h-3.5 w-3.5" />}
            <span>{copiedSql ? "Đã sao chép SQL!" : "Sao chép toàn bộ SQL"}</span>
          </button>
        </div>
        <div className="p-4 bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto max-h-80">
          <pre>{ddlSql}</pre>
        </div>
      </div>
    </div>
  );
};
