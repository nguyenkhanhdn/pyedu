import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const DEFAULT_SUPABASE_URL = "https://kzgnyyudyhnjwgrspmxr.supabase.co";
export const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6Z255eXVkeWhuandncnNwbXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNzM3NTIsImV4cCI6MjEwMzg0OTc1Mn0.IS3QNYzY7uX47nhXQy8l9BW3JdDDJSGzddFagXO7ENU";

export function getStoredSupabaseConfig(): SupabaseConfig {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = (metaEnv.VITE_SUPABASE_URL || "").trim();
  const envKey = (metaEnv.VITE_SUPABASE_ANON_KEY || "").trim();

  let localUrl = "";
  let localKey = "";
  try {
    localUrl = (localStorage.getItem("pyedu_supabase_url") || "").trim();
    localKey = (localStorage.getItem("pyedu_supabase_anon_key") || "").trim();
  } catch {}

  const url = localUrl || (envUrl && envUrl !== "https://your-project.supabase.co" ? envUrl : DEFAULT_SUPABASE_URL);
  const anonKey = localKey || (envKey && envKey !== "your-anon-public-key" ? envKey : DEFAULT_SUPABASE_ANON_KEY);

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getStoredSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith("https://") && url.includes(".supabase.co"));
}

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (!url || !anonKey || !url.startsWith("https://") || !url.includes(".supabase.co")) {
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.warn("Failed to initialize Supabase client:", err);
      return null;
    }
  }
  return supabaseClient;
}

export function setCustomSupabaseConfig(url: string, anonKey: string): boolean {
  try {
    localStorage.setItem("pyedu_supabase_url", url.trim());
    localStorage.setItem("pyedu_supabase_anon_key", anonKey.trim());
    supabaseClient = null; // reset client so next getSupabase uses new credentials
    return true;
  } catch {
    return false;
  }
}

export function clearCustomSupabaseConfig(): void {
  try {
    localStorage.removeItem("pyedu_supabase_url");
    localStorage.removeItem("pyedu_supabase_anon_key");
    supabaseClient = null;
  } catch {}
}

export async function testSupabaseConnection(customUrl?: string, customKey?: string): Promise<{ success: boolean; message: string; tableCount?: number; needsSchema?: boolean }> {
  const url = customUrl || getStoredSupabaseConfig().url;
  const anonKey = customKey || getStoredSupabaseConfig().anonKey;

  if (!url || !anonKey) {
    return { success: false, message: "Chưa cấu hình Supabase URL hoặc Anon Key" };
  }

  try {
    const client = createClient(url, anonKey);
    // Test simple select on users/profiles table
    const { error } = await client.from("users").select("id").limit(1);

    if (error) {
      const msg = (error.message || "").toLowerCase();
      const code = error.code || "";

      // If error is table not found in schema cache / relation does not exist
      if (
        code === "42P01" ||
        code === "PGRST205" ||
        code === "PGRST204" ||
        code === "PGRST200" ||
        msg.includes("schema cache") ||
        msg.includes("could not find the table") ||
        msg.includes("does not exist") ||
        msg.includes("relation")
      ) {
        return {
          success: true,
          message: "Kết nối Supabase thành công! CSDL của bạn chưa có bảng dữ liệu 'users'. Hãy sang Bước 2 để copy & chạy Script SQL tạo bảng.",
          tableCount: 0,
          needsSchema: true
        };
      }

      if (msg.includes("invalid api key") || msg.includes("jwt") || msg.includes("apikey")) {
        return { success: false, message: "Anon Key không hợp lệ. Vui lòng kiểm tra lại anon/public API Key trong Supabase Dashboard." };
      }

      return { success: false, message: `Lỗi kết nối Supabase: ${error.message}` };
    }

    return {
      success: true,
      message: "Kết nối Supabase hoàn toàn thông suốt! Các bảng dữ liệu đã sẵn sàng.",
      tableCount: 1,
      needsSchema: false
    };
  } catch (err: any) {
    const msg = (err.message || String(err)).toLowerCase();
    if (msg.includes("fetch") || msg.includes("network")) {
      return { success: false, message: "Không thể kết nối đến URL Supabase. Vui lòng kiểm tra lại Project URL và kết nối mạng." };
    }
    return { success: false, message: `Lỗi kết nối: ${err.message || String(err)}` };
  }
}
