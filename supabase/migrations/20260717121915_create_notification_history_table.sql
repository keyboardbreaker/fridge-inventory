create table notification_history (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid not null,
    food_item_id uuid not null,
    notification_type text not null,
    recipient_email text not null,
    sent_at timestamptz not null default now()
);