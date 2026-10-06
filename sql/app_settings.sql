-- Bảng cài đặt dùng chung cho cả hệ thống (ví dụ: chế độ ràng buộc học bài do giáo viên bật/tắt cho tất cả học sinh).
-- Chạy một lần trong Supabase → SQL Editor. Có thể chạy lại nhiều lần mà không lỗi.
CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access app_settings" ON public.app_settings;
CREATE POLICY "Allow public access app_settings" ON public.app_settings FOR ALL USING (true) WITH CHECK (true);

-- Mặc định: BẬT chế độ ràng buộc học bài
INSERT INTO public.app_settings (key, value) VALUES ('enforce_sequential', 'true') ON CONFLICT (key) DO NOTHING;
