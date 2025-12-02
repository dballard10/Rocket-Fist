/**
 * @file Header.tsx
 * @description Legacy header component with navigation. This was the original
 * navigation component before role-based layouts were implemented.
 *
 * @deprecated
 * This component is likely NOT IN USE. The application now uses StaffLayout
 * and MemberLayout which include their own navigation. This file is kept for
 * reference but should be removed during cleanup.
 *
 * @note
 * The active navigation is now handled by:
 * - StaffLayout.tsx (for owner, coach, employee roles)
 * - MemberLayout.tsx (for member role)
 *
 * @features (if still used)
 * - Fixed top navigation header
 * - Mobile hamburger menu
 * - Mobile bottom navigation
 * - Dev mode indicator and switcher sheet
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../lib/auth/currentUser";
import { isDeveloperUser } from "../lib/auth/devGuard";
import { useDevRole, getRoleInfo } from "../lib/devRoleMode";
import DevRoleSwitcherSheet from "./dev/DevRoleSwitcherSheet";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    path: "/members",
    label: "Members",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    path: "/classes",
    label: "Classes",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    path: "/schedule",
    label: "Schedule",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    path: "/billing",
    label: "Billing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    path: "/coach",
    label: "Coach",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useCurrentUser();
  const { isDevMode, viewRole, isDevSheetOpen, setIsDevSheetOpen } =
    useDevRole();
  const showDevTab = isDeveloperUser(user);

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
            {/* Logo */}
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

              {/* Dev Mode Indicator (Desktop) */}
              {showDevTab && isDevMode && (
                <button
                  onClick={() => setIsDevSheetOpen(true)}
                  className={`
                    hidden md:flex gap-2 px-3 py-1.5 rounded-md text-xs font-medium
                    ${roleInfo.bgColor} ${roleInfo.color} border border-current/20
                    hover:opacity-80 transition-opacity
                  `}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {roleInfo.label} View
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/80 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item) => (
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

              {/* Dev Tab (Mobile Dropdown) */}
              {showDevTab && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsDevSheetOpen(true);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isDevMode
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }
                  `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Dev Mode
                  {isDevMode && (
                    <span
                      className={`ml-auto text-xs px-2 py-0.5 rounded-full ${roleInfo.bgColor} ${roleInfo.color}`}
                    >
                      {roleInfo.label}
                    </span>
                  )}
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation - Fixed */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          {/* Show first 4 nav items + dev tab if available */}
          {navItems.slice(0, showDevTab ? 4 : 5).map((item) => (
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

          {/* Dev Tab (Mobile Bottom Nav) */}
          {showDevTab && (
            <button
              onClick={() => setIsDevSheetOpen(true)}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${isDevMode ? "text-amber-400" : "text-gray-500"}
              `}
            >
              <div className="relative">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {isDevMode && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-[10px]">Dev</span>
            </button>
          )}
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
