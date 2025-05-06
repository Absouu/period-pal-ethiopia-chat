
import { createClient } from '@supabase/supabase-js';

// Direct values instead of environment variables
const supabaseUrl = "https://your-supabase-project-url.supabase.co";
const supabaseAnonKey = "your-supabase-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  username: string;
  created_at: string;
  user_id: string;
};
