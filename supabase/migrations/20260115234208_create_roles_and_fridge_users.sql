create type role as enum ('user', 'admin');

create table fridge_users (
  fridge_id uuid references fridges(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role_type role not null default 'user',
  primary key (fridge_id, user_id)
);