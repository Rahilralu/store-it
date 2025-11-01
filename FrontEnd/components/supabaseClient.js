import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { redirect } from 'next/dist/server/api-utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });
  if (error) console.error("Google Auth Error:", error.message);
};

export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });
  if (error) console.error("Google Auth Error:", error.message);
};

