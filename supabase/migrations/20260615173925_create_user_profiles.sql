create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    first_name text not null,
    last_name text not null,
    created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view profiles"
on profiles
for select
to authenticated
using (true);

create policy "Users can manage own profile"
on profiles
for all
to authenticated
using (id = auth.uid())
with check (id = auth.uid());