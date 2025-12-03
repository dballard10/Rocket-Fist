import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client that returns empty results when Supabase is not configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      eq: () => ({
        neq: () => ({
          order: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        }),
        order: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
      gte: () => ({
        lt: () => ({
          order: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        }),
      }),
      in: () => ({
        neq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
      neq: () => ({
        order: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      }),
    }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
  },
});

// Export supabase client - uses mock if not configured
export const supabase: SupabaseClient | ReturnType<typeof createMockClient> = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient();

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
