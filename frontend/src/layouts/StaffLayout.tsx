/**
 * @file StaffLayout.tsx
 * @description Main layout wrapper for the Staff Portal. Provides role-based navigation,
 * responsive header/footer navigation, and wraps all staff-facing pages. Navigation items
 * are dynamically filtered based on the user's role (owner, coach, or employee).
 *
 * @portal Staff
 * @roles owner, coach, employee
 *
 * @features
 * - Role-based navigation filtering (different nav items per role)
 * - Fixed top header with logo and desktop navigation
 * - Mobile hamburger menu for full navigation access
 * - Fixed bottom navigation on mobile (first 5 nav items)
 * - Dev mode indicator for role switching during development
 * - Responsive design with mobile-first approach
 *
 * @example
 * // Used in App.tsx as the wrapper for all staff routes
 * <Route element={<StaffLayout />}>
 *   <Route path="/" element={<Dashboard />} />
 *   <Route path="/members" element={<Members />} />
 * </Route>
 */

import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useCurrentUser } from "../lib/auth/currentUser";
import { isDeveloperUser } from "../lib/auth/devGuard";
import { useDevRole, getRoleInfo, type ViewRole } from "../lib/devRoleMode";
import DevRoleSwitcherSheet from "../components/dev/DevRoleSwitcherSheet";

/**
 * Navigation icon components for cleaner, more maintainable code.
 * Each icon is an SVG wrapped in a functional component.
 */
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const MembersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ClassesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ScheduleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AttendanceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const BillingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckInIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

const MyClassesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const AccountIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

/**
 * Configuration interface for navigation items.
 * @interface NavItem
 * @property {string} path - The route path for this navigation item
 * @property {string} label - Display label shown in the navigation
 * @property {React.ReactNode} icon - Icon component to display alongside the label
 * @property {ViewRole[]} roles - Array of roles that can access this nav item
 */
interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: ViewRole[];
}

/**
 * Navigation configuration with role-based visibility.
 * Each item specifies which staff roles can see and access it.
 *
 * CONSOLIDATED NAVIGATION (reduced navbar clutter):
 * - owner: Dashboard, Members (w/ Attendance tab), Classes (w/ Schedule tab), Settings (w/ Billing, Gym, Account tabs)
 * - coach: Dashboard, Classes (w/ My Classes, Schedule tabs), Members (w/ Attendance tab), Settings
 * - employee: Check-ins, Members, Classes (w/ Schedule tab), Settings
 */
const navItems: NavItem[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: <DashboardIcon />,
    roles: ["owner", "coach"],
  },
  {
    path: "/check-ins",
    label: "Check-ins",
    icon: <CheckInIcon />,
    roles: ["employee"],
  },
  {
    path: "/members",
    label: "Members",
    icon: <MembersIcon />,
    roles: ["owner", "employee", "coach"],
  },
  {
    path: "/classes",
    label: "Classes",
    icon: <ClassesIcon />,
    roles: ["owner", "employee", "coach"],
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
    roles: ["owner"],
  },
  {
    path: "/account",
    label: "Settings",
    icon: <AccountIcon />,
    roles: ["coach", "employee"],
  },
];

/**
 * Filters navigation items based on the user's role.
 * @param {ViewRole} role - The current user's role (owner, coach, or employee)
 * @returns {NavItem[]} Array of navigation items accessible to the given role
 */
function getNavItemsForRole(role: ViewRole): NavItem[] {
  return navItems.filter((item) => item.roles.includes(role));
}

export default function StaffLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useCurrentUser();
  const { isDevMode, viewRole, isDevSheetOpen, setIsDevSheetOpen } = useDevRole();
  const showDevTab = isDeveloperUser(user);

  const filteredNavItems = getNavItemsForRole(viewRole);
  
  // Get items for bottom nav (first 5 items)
  const bottomNavItems = filteredNavItems.slice(0, 5);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const roleInfo = getRoleInfo(viewRole);

  return (
    <>
      {/* Top Navigation - Fixed */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Dev Mode Indicator */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center space-x-0 shrink-0">
                <img
                  src="/logos/rocket-fist-logo.png"
                  alt="Rocket-Fist"
                  className="w-12 h-12 md:w-16 md:h-16"
                />
                <img
                  src="/logos/rocket-fist-title.png"
                  alt="Rocket-Fist"
                  className="w-20 h-20 md:w-24 md:h-24 hidden sm:block"
                />
              </Link>

              {/* Dev Mode Indicator - next to logo */}
              {showDevTab && (
                <button
                  onClick={() => setIsDevSheetOpen(true)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium
                    ${roleInfo.bgColor} ${roleInfo.color} border border-current/20
                    hover:opacity-80 transition-opacity
                  `}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {roleInfo.label} View
                </button>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive(item.path)
                        ? "bg-[--color-primary-red] text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-800 bg-black/80 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-3 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive(item.path)
                        ? "bg-[--color-primary-red] text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-16 xl:pb-0 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - Fixed */}
      <nav className="xl:hidden fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${
                  isActive(item.path)
                    ? "text-[--color-primary-red]"
                    : "text-gray-500"
                }
              `}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}

        </div>
      </nav>

      {/* Dev Role Switcher Sheet */}
      <DevRoleSwitcherSheet
        open={isDevSheetOpen}
        onOpenChange={setIsDevSheetOpen}
      />
    </>
  );
}


