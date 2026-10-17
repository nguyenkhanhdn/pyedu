-- All test rows are rolled back. No messages are committed or broadcast.
BEGIN;
DO $$
DECLARE
  uid text := 'antispam-test-' || gen_random_uuid()::text;
  gid text;
  result_role text;
  result_time timestamptz;
  rejected boolean;
BEGIN
  SELECT id INTO gid FROM public.study_groups LIMIT 1;
  IF gid IS NULL THEN RAISE EXCEPTION 'A study group is needed for this test'; END IF;
  INSERT INTO public.users(id,username,email,full_name,avatar,role,status)
    VALUES(uid,uid,uid || '@example.test','Temporary anti-spam test','', 'student','active');
  INSERT INTO public.group_messages(id,group_id,user_id,user_name,user_avatar,user_role,content,timestamp)
    VALUES(uid || '-1',gid,uid,'Test','','teacher','First test message',now()-interval '1 year')
    RETURNING user_role,timestamp INTO result_role,result_time;
  IF result_role <> 'student' OR result_time < now()-interval '5 seconds' THEN RAISE EXCEPTION 'Role/time spoof guard failed'; END IF;
  rejected := false;
  BEGIN
    INSERT INTO public.group_messages(id,group_id,user_id,user_name,user_avatar,content) VALUES(uid || '-2',gid,uid,'Test','','Second message');
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'CHAT_RATE_LIMIT:%' THEN RAISE; END IF;
    rejected := true;
  END;
  IF NOT rejected THEN RAISE EXCEPTION 'Cooldown failed'; END IF;
  UPDATE public.group_messages SET timestamp=clock_timestamp()-interval '6 seconds' WHERE user_id=uid;
  rejected := false;
  BEGIN
    INSERT INTO public.group_messages(id,group_id,user_id,user_name,user_avatar,content) VALUES(uid || '-2',gid,uid,'Test','','  FIRST   test message  ');
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'CHAT_DUPLICATE:%' THEN RAISE; END IF;
    rejected := true;
  END;
  IF NOT rejected THEN RAISE EXCEPTION 'Duplicate guard failed'; END IF;
  FOR i IN 2..10 LOOP
    INSERT INTO public.group_messages(id,group_id,user_id,user_name,user_avatar,content) VALUES(uid || '-' || i,gid,uid,'Test','','Unique message ' || i);
    UPDATE public.group_messages SET timestamp=clock_timestamp()-interval '6 seconds' WHERE user_id=uid;
  END LOOP;
  rejected := false;
  BEGIN
    INSERT INTO public.group_messages(id,group_id,user_id,user_name,user_avatar,content) VALUES(uid || '-11',gid,uid,'Test','','Eleventh message');
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'CHAT_RATE_LIMIT:%' THEN RAISE; END IF;
    rejected := true;
  END;
  IF NOT rejected THEN RAISE EXCEPTION 'Per-minute limit failed'; END IF;
END;
$$;
ROLLBACK;
SELECT 'Cooldown, normalized duplicates, minute quota, server role/time: passed; all test rows rolled back' AS result;
