-- Run once in the Supabase SQL editor (same project as workbook-organisation)
-- Centralizes every future client workbook (positionnement/voix, identité
-- visuelle, etc.) in one table, tagged by workbook_type, with the actual
-- answers stored as JSONB so each workbook can have its own shape.

create table if not exists client_workbooks (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  workbook_type text not null,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table client_workbooks enable row level security;

-- Allows the public workbook (anon key) to insert a submission.
-- No public read/update/delete — only you can read via the Supabase dashboard
-- or a service-role key.
create policy "Anyone can submit a workbook"
  on client_workbooks
  for insert
  to anon
  with check (true);
