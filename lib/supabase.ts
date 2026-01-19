import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Debug: Warn if Supabase credentials are not set (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase environment variables are not set!');
    console.warn('Please create a .env.local file with:');
    console.warn('NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"');
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"');
    console.warn('See SUPABASE_SETUP.md for detailed instructions.');
    console.warn('Then restart the dev server with: npm run dev');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
