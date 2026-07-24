-- Run once in the Supabase SQL editor, AFTER creating your admin user in
-- Authentication > Users (see instructions from Claude for the exact steps).
--
-- This lets only a logged-in ("authenticated") Supabase user read the
-- client_workbooks table. The public workbook itself still only has INSERT
-- access via the anon key (see create_table.sql) — nobody can read rows
-- without logging in through the /admin page.

create policy "Authenticated can read all workbooks"
  on client_workbooks
  for select
  to authenticated
  using (true);
