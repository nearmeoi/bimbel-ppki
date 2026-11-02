import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

if (!isSupabaseConfigured) {
  console.info(
    '[Supabase] Kredensial VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum dikonfigurasi. Menggunakan fallback data lokal.'
  );
}

// Inisialisasi Supabase client (fallback ke placeholder aman jika env belum terpasang saat build/dev)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      supabaseUrl || 'https://placeholder-project.supabase.co',
      supabaseAnonKey || 'placeholder-anon-key'
    );

export default supabase;
