-- auth.usersテーブルの確認
select id, email, confirmed_at 
from auth.users 
where email = 'test@example.com';

-- プロフィールの確認
select p.id, p.username, u.email 
from public.profiles p 
join auth.users u on u.id = p.id 
where u.email = 'test@example.com'; 