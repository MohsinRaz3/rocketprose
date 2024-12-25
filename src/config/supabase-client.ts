// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL!;
// const supabaseAnonKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

// Use Vite's `import.meta.env` for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
