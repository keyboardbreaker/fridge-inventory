insert into fridges (id, name)
values
  ('11111111-1111-1111-1111-111111111111', 'Office Fridge'),
  ('22222222-2222-2222-2222-222222222222', 'Family Fridge')
on conflict do nothing;

insert into auth.users (
  id,
  email
)
values (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'dev@example.com'
)
on conflict do nothing;

insert into fridge_users (fridge_id, user_id, role_type)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'admin'
  )
on conflict do nothing;

insert into profiles (
    id,
    first_name,
    last_name,
    email
)
values (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'John',
    'Smith',
    'john@example.com'
)
on conflict (id) do nothing;


-- Sample food
insert into food_items (
  fridge_id,
  owner_id,
  name,
  share_status,
  quantity,
  unit
)
values
(
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Bread',
  'shared',
  1,
  'loaf'
),
(
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Milk',
  'private',
  2,
  'L'
),
(
  '11111111-1111-1111-1111-111111111111',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Eggs',
  'ask',
  12,
  'pcs'
);