alter table food_items
drop constraint food_items_owner_id_fkey;

alter table food_items
add constraint food_items_owner_id_fkey
foreign key (owner_id)
references profiles(id)
on delete set null;