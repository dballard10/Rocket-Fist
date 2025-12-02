/**
 * Developer Guard Utilities
 * 
 * Controls visibility of developer-only features like the role switcher.
 * This is purely for frontend view mode override, NOT real authorization.
 */

interface UserLike {
  email?: string | null;
  id?: string;
}

/**
 * Check if the dev role switcher feature is enabled via environment variable.
 */
export function isDevSwitcherEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_DEV_SWITCHER === 'true';
}

/**
 * Get the list of developer emails from environment variable.
 * Expects comma-separated emails in VITE_DEV_EMAILS.
 */
export function getDevEmails(): string[] {
  const devEmails = import.meta.env.VITE_DEV_EMAILS || '';
  return devEmails
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Check if a user is an authorized developer who can see the role switcher.
 * 
 * Returns true if:
 * 1. In development mode (import.meta.env.DEV), OR
 * 2. VITE_ENABLE_DEV_SWITCHER === 'true' AND User's email is in VITE_DEV_EMAILS allowlist
 * 
 * @param user - User object with email property
 */
export function isDeveloperUser(user: UserLike | null | undefined): boolean {
  // Always show in development mode for easier testing
  if (import.meta.env.DEV) {
    return true;
  }

  // Must have the feature flag enabled
  if (!isDevSwitcherEnabled()) {
    return false;
  }

  // Must have a user with an email
  if (!user?.email) {
    return false;
  }

  // Check if user's email is in the allowlist
  const devEmails = getDevEmails();
  const userEmail = user.email.toLowerCase();

  return devEmails.includes(userEmail);
}



