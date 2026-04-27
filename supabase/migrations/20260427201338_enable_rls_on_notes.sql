alter table notes enable row level security;

create policy "Allow public read" on notes
  for select using (true);

create policy "Allow public insert" on notes
  for insert with check (true);
