create type share_status as enum ('private', 'shared', 'ask');

create table food_items (
  id uuid primary key default gen_random_uuid(),
  fridge_id uuid references fridges(id) on delete cascade,
  owner_id uuid references auth.users(id),

  name text not null,
  best_before_date date,

  share_status share_status not null default 'private',
  quantity numeric,
  unit text,

  notes text,
  created_at timestamptz default now()
);