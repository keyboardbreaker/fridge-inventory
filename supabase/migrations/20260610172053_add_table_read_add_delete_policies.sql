alter table food_items enable row level security;
alter table fridges enable row level security;
alter table fridge_users enable row level security;

create policy "Users can delete their own food"
on food_items
for delete
to authenticated
using (
    owner_id = auth.uid()
);

create policy "Users can insert their own food"
on food_items
for insert
to authenticated
with check (
    owner_id = auth.uid()
);

create policy "Users can view food in their fridges"
on food_items
for select
to authenticated
using (
    exists (
        select 1
        from fridge_users fu
        where fu.fridge_id = food_items.fridge_id
        and fu.user_id = auth.uid()
    )
);

create policy "Users can view their fridges"
on fridges
for select
to authenticated
using (
    exists (
        select 1
        from fridge_users fu
        where fu.fridge_id = fridges.id
        and fu.user_id = auth.uid()
    )
);