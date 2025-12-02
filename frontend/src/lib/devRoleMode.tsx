import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ViewRole = 'owner' | 'coach' | 'employee' | 'member';

interface DevRoleContextValue {
  /** Current view role override */
  viewRole: ViewRole;
  /** Whether dev mode override is currently active */
  isDevMode: boolean;
  /** Set the view role override */
  setViewRole: (role: ViewRole) => void;
  /** Enable/disable dev mode override */
  setIsDevMode: (value: boolean) => void;
  /** Whether the dev sheet is open (persists across layout changes) */
  isDevSheetOpen: boolean;
  /** Open/close the dev sheet */
  setIsDevSheetOpen: (value: boolean) => void;
}

const DevRoleContext = createContext<DevRoleContextValue | null>(null);

const STORAGE_KEY_ROLE = 'rocket-fist-dev-role';
const STORAGE_KEY_ENABLED = 'rocket-fist-dev-mode';

interface DevRoleProviderProps {
  children: ReactNode;
}

/**
 * Provider component for the dev role switcher.
 * Persists the selected role and enabled state to localStorage.
 */
export function DevRoleProvider({ children }: DevRoleProviderProps) {
  const [viewRole, setViewRoleState] = useState<ViewRole>(() => {
    if (typeof window === 'undefined') return 'owner';
    const stored = localStorage.getItem(STORAGE_KEY_ROLE);
    if (stored === 'owner' || stored === 'coach' || stored === 'employee' || stored === 'member') {
      return stored;
    }
    return 'owner';
  });

  const [isDevMode, setIsDevModeState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_ENABLED) === 'true';
  });

  // Dev sheet open state - persists across layout changes
  const [isDevSheetOpen, setIsDevSheetOpen] = useState(false);

  // Persist role to localStorage
  const setViewRole = (role: ViewRole) => {
    setViewRoleState(role);
    localStorage.setItem(STORAGE_KEY_ROLE, role);
  };

  // Persist dev mode state to localStorage
  const setIsDevMode = (value: boolean) => {
    setIsDevModeState(value);
    localStorage.setItem(STORAGE_KEY_ENABLED, value.toString());
  };

  const value: DevRoleContextValue = {
    viewRole,
    isDevMode,
    setViewRole,
    setIsDevMode,
    isDevSheetOpen,
    setIsDevSheetOpen,
  };

  return (
    <DevRoleContext.Provider value={value}>
      {children}
    </DevRoleContext.Provider>
  );
}

/**
 * Hook to access the dev role context.
 * Must be used within a DevRoleProvider.
 */
export function useDevRole(): DevRoleContextValue {
  const context = useContext(DevRoleContext);
  if (!context) {
    throw new Error('useDevRole must be used within a DevRoleProvider');
  }
  return context;
}

/**
 * Hook to get the effective view role.
 * Returns the override role if dev mode is active, otherwise returns the actual role.
 * 
 * @param actualRole - The user's real role from the database
 */
export function useEffectiveRole(actualRole: ViewRole): ViewRole {
  const { viewRole, isDevMode } = useDevRole();
  return isDevMode ? viewRole : actualRole;
}

/**
 * Helper to get role display info.
 */
export function getRoleInfo(role: ViewRole): { label: string; color: string; bgColor: string } {
  switch (role) {
    case 'owner':
      return { label: 'Owner', color: 'text-purple-400', bgColor: 'bg-purple-500/20' };
    case 'coach':
      return { label: 'Coach', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
    case 'employee':
      return { label: 'Employee', color: 'text-amber-400', bgColor: 'bg-amber-500/20' };
    case 'member':
      return { label: 'Member', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' };
  }
}

/**
 * Check if a role is a staff role (not a member).
 */
export function isStaffRole(role: ViewRole): boolean {
  return role === 'owner' || role === 'coach' || role === 'employee';
}



