import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or Anon Key in environment variables");
}

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Anon Key:", supabaseAnonKey);

// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);