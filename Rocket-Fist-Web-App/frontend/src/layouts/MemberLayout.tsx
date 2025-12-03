/**
 * @file MemberLayout.tsx
 * @description Main layout wrapper for the Member Portal. Provides a simplified,
 * member-focused navigation experience with bottom navigation on mobile and
 * top navigation on desktop.
 *
 * @portal Member
 * @roles member (gym members only)
 *
 * @features
 * - Simplified navigation (Dashboard, Classes, Settings)
 * - Fixed top header with logo and desktop navigation
 * - Mobile-first bottom navigation with icon highlights
 * - Dev mode indicator for role switching during development
 * - Dark gradient background for modern aesthetic
 *
 * @example
 * // Used in App.tsx as the wrapper for all member routes
 * <Route element={<MemberLayout />}>
 *   <Route path="/" element={<MemberDashboard />} />
 *   <Route path="/schedule" element={<MemberClasses />} />
 * </Route>
 */

import { Link, useLocation, Outlet } from "react-router-dom";
import { useCurrentUser } from "../lib/auth/currentUser";
import { isDeveloperUser } from "../lib/auth/devGuard";
import { useDevRole, getRoleInfo } from "../lib/devRoleMode";
import DevRoleSwitcherSheet from "../components/dev/DevRoleSwitcherSheet";
import { IconHome, IconCalendar, IconSettings } from "@tabler/icons-react";

/**
 * Navigation items for the member portal.
 * All items are accessible to all gym members.
 *
 * Routes:
 * - / (Dashboard): QR check-in code, next class, quick actions
 * - /schedule: Browse and book classes
 * - /settings: Account and membership management (with tabs)
 */
const navItems = [
  { path: "/", label: "Dashboard", icon: <IconHome size={20} stroke={1.5} /> },
  {
    path: "/schedule",
    label: "Classes",
    icon: <IconCalendar size={20} stroke={1.5} />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <IconSettings size={20} stroke={1.5} />,
  },
];

/**
 * Member portal layout component.
 * Renders the navigation structure and provides outlet for child routes.
 *
 * @returns {JSX.Element} The member layout with header, content area, and mobile bottom nav
 */
export default function MemberLayout() {
  const location = useLocation();

  const { user } = useCurrentUser();
  const { viewRole, isDevSheetOpen, setIsDevSheetOpen } = useDevRole();
  const showDevTab = isDeveloperUser(user);

  const roleInfo = getRoleInfo(viewRole);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Header - Simplified for Members */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Dev Mode Indicator */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center space-x-0 shrink-0">
                <img
                  src="/logos/rocket-fist-logo.png"
                  alt="Rocket-Fist"
                  className="w-16 h-16"
                />
                <img
                  src="/logos/rocket-fist-title.png"
                  alt="Rocket-Fist"
                  className="w-24 h-24 hidden sm:block"
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
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-0 min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - Primary navigation for members */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-t border-gray-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-all
                ${
                  isActive(item.path)
                    ? "text-[--color-primary-red]"
                    : "text-gray-500"
                }
              `}
            >
              <div
                className={`
                p-2 rounded-xl transition-all
                ${isActive(item.path) ? "bg-[--color-primary-red]/10" : ""}
              `}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
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
