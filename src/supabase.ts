import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are valid and not placeholders
const isConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co' && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== '';

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn(
    "Supabase is not configured. Falling back to local storage simulation.\n" +
    "To enable real database connectivity, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables."
  );
}
