import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase/client';
import type { User } from '@supabase/supabase-js';

interface CurrentUserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to get the current authenticated user from Supabase.
 * Automatically updates when auth state changes.
 * Returns null user when Supabase is not configured.
 */
export function useCurrentUser(): CurrentUserState {
  const [state, setState] = useState<CurrentUserState>({
    user: null,
    isLoading: isSupabaseConfigured, // Only loading if Supabase is configured
    error: null,
  });

  useEffect(() => {
    // If Supabase is not configured, return early with no user
    if (!isSupabaseConfigured) {
      setState({ user: null, isLoading: false, error: null });
      return;
    }

    // Get initial session
    const getInitialUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          // Don't treat "not authenticated" as an error
          if (error.message !== 'Auth session missing!') {
            setState({ user: null, isLoading: false, error });
            return;
          }
        }
        
        setState({ user: user ?? null, isLoading: false, error: null });
      } catch (err) {
        setState({ user: null, isLoading: false, error: err as Error });
      }
    };

    getInitialUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({ user: session?.user ?? null, isLoading: false, error: null });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
}

/**
 * Get the current user's display name.
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  
  // Try to get name from user metadata
  const metadata = user.user_metadata;
  if (metadata?.full_name) return metadata.full_name;
  if (metadata?.name) return metadata.name;
  
  // Fall back to email
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'User';
}
