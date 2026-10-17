CREATE INDEX IF NOT EXISTS idx_group_messages_user_time ON public.group_messages(user_id, timestamp DESC);

CREATE OR REPLACE FUNCTION public.enforce_group_chat_limits()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE
  sender public.users%ROWTYPE;
  sent_at timestamptz;
  last_at timestamptz;
  recent_count integer;
BEGIN
  -- Serialize concurrent sends for the same account, including different groups.
  SELECT * INTO sender FROM public.users WHERE id = NEW.user_id FOR UPDATE;
  IF NOT FOUND OR sender.role NOT IN ('student', 'teacher', 'admin') OR sender.status <> 'active' THEN
    RAISE EXCEPTION 'CHAT_BLOCKED: Tài khoản không được phép gửi tin nhắn.';
  END IF;
  NEW.content := btrim(coalesce(NEW.content, ''));
  NEW.code_snippet := nullif(btrim(coalesce(NEW.code_snippet, '')), '');
  IF NEW.content = '' AND NEW.code_snippet IS NULL THEN
    RAISE EXCEPTION 'CHAT_INVALID: Tin nhắn không được để trống.';
  END IF;
  IF char_length(NEW.content) > 1000 OR char_length(coalesce(NEW.code_snippet, '')) > 1000 THEN
    RAISE EXCEPTION 'CHAT_INVALID: Nội dung và mã nguồn tối đa 1000 ký tự mỗi phần.';
  END IF;
  -- Use the real profile and server time, never the role/time supplied by a client.
  NEW.user_role := sender.role;
  NEW.user_name := sender.full_name;
  NEW.user_avatar := sender.avatar;
  sent_at := clock_timestamp();
  NEW.timestamp := sent_at;
  IF sender.role IN ('teacher', 'admin') THEN RETURN NEW; END IF;

  SELECT max(timestamp), count(*) INTO last_at, recent_count
  FROM public.group_messages WHERE user_id = NEW.user_id AND timestamp > sent_at - interval '60 seconds';
  IF last_at > sent_at - interval '5 seconds' THEN
    RAISE EXCEPTION 'CHAT_RATE_LIMIT: Vui lòng chờ ít nhất 5 giây giữa hai tin nhắn.';
  END IF;
  IF recent_count >= 10 THEN
    RAISE EXCEPTION 'CHAT_RATE_LIMIT: Bạn đã gửi 10 tin trong một phút. Hãy chờ rồi gửi tiếp.';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.group_messages
    WHERE user_id = NEW.user_id AND timestamp > sent_at - interval '60 seconds'
      AND lower(regexp_replace(btrim(content), '\s+', ' ', 'g')) = lower(regexp_replace(NEW.content, '\s+', ' ', 'g'))
      AND regexp_replace(btrim(coalesce(code_snippet, '')), '\s+', ' ', 'g') = regexp_replace(coalesce(NEW.code_snippet, ''), '\s+', ' ', 'g')
  ) THEN
    RAISE EXCEPTION 'CHAT_DUPLICATE: Bạn vừa gửi nội dung này. Vui lòng chờ 60 giây trước khi gửi lại.';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS group_chat_anti_spam ON public.group_messages;
CREATE TRIGGER group_chat_anti_spam BEFORE INSERT ON public.group_messages FOR EACH ROW EXECUTE FUNCTION public.enforce_group_chat_limits();
