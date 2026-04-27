create table notes (
  id bigint generated always as identity primary key,
  created_at timestamptz default now()
);
