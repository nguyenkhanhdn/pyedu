-- Applied as the lesson_submission_snapshots migration on the connected database.
-- Compatible with existing submissions; older rows intentionally have no code snapshot.
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS practice_key TEXT;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS code TEXT;
CREATE INDEX IF NOT EXISTS idx_submissions_user_time ON public.submissions(user_id, timestamp DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_algorithm_submissions_user_time ON public.algorithm_submissions(user_id, timestamp DESC, id DESC);
NOTIFY pgrst, 'reload schema';
