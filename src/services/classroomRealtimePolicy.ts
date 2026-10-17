// Keep in sync with sql/classroom_realtime.sql.
export const CLASSROOM_REALTIME_SQL = String.raw`-- Do not publish users: profiles include sensitive fields unrelated to submissions.
DO $$
DECLARE table_name text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    RAISE EXCEPTION 'Supabase Realtime publication is not available';
  END IF;
  FOREACH table_name IN ARRAY ARRAY['submissions', 'algorithm_submissions', 'user_progress'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename=table_name) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', table_name);
    END IF;
  END LOOP;
END;
$$;
`;
