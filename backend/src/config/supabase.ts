import { createClient } from '@supabase/supabase-js';
import { config } from './env';

export const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});




