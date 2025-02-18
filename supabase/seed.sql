-- テスト用ユーザーの作成
INSERT INTO auth.users (id, email, encrypted_password) VALUES
  ('00000000-0000-0000-0000-000000000000', 'test@example.com', crypt('password123', gen_salt('bf')));

-- 既存のデータを削除
truncate table public.profiles cascade;

-- テストデータの挿入
insert into public.profiles (id, username, updated_at)
values 
  ('00000000-0000-0000-0000-000000000000', 'test_user', now())
on conflict (id) do nothing;  -- 重複時はスキップ

-- サンプルの看板データ
INSERT INTO public.boards (id, user_id, title) VALUES
  (1, '00000000-0000-0000-0000-000000000000', '2024年の目標'),
  (2, '00000000-0000-0000-0000-000000000000', '技術スキル目標'),
  (3, '00000000-0000-0000-0000-000000000000', '個人開発目標');

-- サンプルの目標データ
INSERT INTO public.goals (user_id, title, description, type, status, board_id, color) VALUES
  ('00000000-0000-0000-0000-000000000000', 'プログラミングスキルの向上', 'フロントエンド、バックエンド両方のスキルを伸ばす', 'big', 'doing', 1, '#4CAF50'),
  ('00000000-0000-0000-0000-000000000000', 'Next.jsの習得', 'App RouterやServer Componentsの理解を深める', 'medium', 'todo', 2, '#2196F3'),
  ('00000000-0000-0000-0000-000000000000', 'ポートフォリオの作成', 'オリジナルのWebアプリケーションを開発', 'small', 'done', 3, '#9C27B0'); 