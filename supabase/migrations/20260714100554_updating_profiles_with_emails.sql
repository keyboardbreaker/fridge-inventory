alter table profiles
add column email text,
add column email_notifications boolean not null default true,
add column notify_days_before integer not null default 2;

update profiles p
set email = u.email
from auth.users u
where p.id = u.id;

alter table profiles
alter column email set not null;

alter table profiles
add constraint profiles_email_key unique (email);