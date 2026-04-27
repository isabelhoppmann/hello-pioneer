create table email_events (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  event_type text,
  email_id text,
  recipient text,
  subject text
);

alter table email_events enable row level security;

create policy "Allow public read" on email_events
  for select using (true);

create policy "Allow public insert" on email_events
  for insert with check (true);
