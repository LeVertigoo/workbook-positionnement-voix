import { createClient } from '@supabase/supabase-js'

// Same Supabase project already used by workbook-organisation, so every
// workbook lands in one place. This new project needs the `client_workbooks`
// table created once (see sql/create_table.sql) before submissions persist.
const supabaseUrl = 'https://qglyfohuebgbuztjqaok.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbHlmb2h1ZWJnYnV6dGpxYW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTgxODQsImV4cCI6MjA5MTgzNDE4NH0.HKqxiTKQDV8zvfpTmE8RlDq_GsbwHATzfn1gyDkJLxQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
