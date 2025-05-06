
import { createClient } from '@supabase/supabase-js';

// Direct values instead of environment variables
const supabaseUrl = "https://bksakzulantqzfpvysfs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc2FrenVsYW50cXpmcHZ5c2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MjcyMzMsImV4cCI6MjA2MjEwMzIzM30.vD8rxCaVQc9_-lNJXmY5fLU32P1atY-NR2QLL4lBQeo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  username: string;
  created_at: string;
  user_id: string;
};
