import { createClient } from '@supabase/supabase-js'

// Supabase credentials (your project)
const SUPABASE_URL = 'https://bdxzwwhccxvyvnhfaoyx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkeHp3d2hjY3h2eXZuaGZhb3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjUxMzgsImV4cCI6MjA3NzIwMTEzOH0.kfVX4-9cOe7FUHqhTtPFvcxLHUQbZ6j1z7RoiveU96g'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
