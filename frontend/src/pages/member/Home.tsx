/**
 * @file Home.tsx (Member)
 * @description Member portal home/dashboard page. The primary landing page for
 * gym members featuring their check-in code, upcoming class, and quick actions.
 * Designed for mobile-first use when members arrive at the gym.
 *
 * @portal Member
 * @roles member (gym members only)
 * @route / (root route for member portal)
 *
 * @features
 * - QR Code check-in display:
 *   - Shows scannable QR code for front desk check-in
 *   - Toggle to show 4-digit PIN as alternative
 *   - Animated glow effect for visibility
 * - Next class card:
 *   - Shows member's next reserved class
 *   - View details and cancel options
 * - Quick action cards:
 *   - "Book Class" - links to /schedule
 *   - "Membership" - links to /membership
 * - Training streak display (commented out, future feature)
 *
 * @layout
 * - Single column, mobile-optimized (max-w-lg)
 * - Centered content with generous spacing
 *
 * @data
 * - Currently uses mock data (to be replaced with authenticated user data)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { IconFlame } from "@tabler/icons-react";
import Button from "../../components/ui/Button";

// Mock data for member home - replace with authenticated user data
const mockMemberData = {
  name: "Chris Martinez",
  memberSince: "March 2024",
  plan: "Unlimited Monthly",
  nextClass: {
    name: "All-Levels BJJ",
    time: "12:00 PM Today",
    instructor: "Sarah Chen",
  },
  streak: 12,
};

// Mock QR code SVG (in production, this would be generated)
const QRCodePlaceholder = () => (
  <div className="relative">
    <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-3 shadow-2xl">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Simple QR pattern representation */}
        <rect fill="#000" x="10" y="10" width="25" height="25" />
        <rect fill="#000" x="65" y="10" width="25" height="25" />
        <rect fill="#000" x="10" y="65" width="25" height="25" />
        <rect fill="#fff" x="15" y="15" width="15" height="15" />
        <rect fill="#fff" x="70" y="15" width="15" height="15" />
        <rect fill="#fff" x="15" y="70" width="15" height="15" />
        <rect fill="#000" x="18" y="18" width="9" height="9" />
        <rect fill="#000" x="73" y="18" width="9" height="9" />
        <rect fill="#000" x="18" y="73" width="9" height="9" />
        {/* Pattern */}
        <rect fill="#000" x="40" y="10" width="5" height="5" />
        <rect fill="#000" x="50" y="10" width="5" height="5" />
        <rect fill="#000" x="40" y="20" width="5" height="5" />
        <rect fill="#000" x="45" y="25" width="5" height="5" />
        <rect fill="#000" x="55" y="20" width="5" height="5" />
        <rect fill="#000" x="40" y="40" width="20" height="20" />
        <rect fill="#fff" x="45" y="45" width="10" height="10" />
        <rect fill="#000" x="48" y="48" width="4" height="4" />
        <rect fill="#000" x="65" y="40" width="5" height="5" />
        <rect fill="#000" x="75" y="45" width="5" height="5" />
        <rect fill="#000" x="70" y="55" width="5" height="5" />
        <rect fill="#000" x="80" y="65" width="10" height="5" />
        <rect fill="#000" x="40" y="65" width="5" height="10" />
        <rect fill="#000" x="50" y="70" width="10" height="5" />
        <rect fill="#000" x="45" y="80" width="5" height="10" />
        <rect fill="#000" x="55" y="85" width="5" height="5" />
        <rect fill="#000" x="65" y="75" width="5" height="5" />
        <rect fill="#000" x="75" y="80" width="10" height="10" />
      </svg>
    </div>
    {/* Animated glow effect */}
    <div className="absolute inset-0 w-48 h-48 mx-auto rounded-2xl bg-[--color-primary-red]/20 blur-xl -z-10 animate-pulse" />
  </div>
);

export default function MemberHome() {
  const [showQR, setShowQR] = useState(true);

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Welcome back, {mockMemberData.name.split(" ")[0]}!
        </h1>
        <p className="text-gray-400">
          Member since {mockMemberData.memberSince}
        </p>
      </div>

      {/* Check-in QR Code */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl border border-gray-800 p-6 mb-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-white mb-1">
            Check-in Code
          </h2>
          <p className="text-sm text-gray-500">Show this at the front desk</p>
        </div>

        {showQR ? (
          <div className="py-4">
            <QRCodePlaceholder />
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-6xl font-mono font-bold text-white tracking-wider">
              2847
            </p>
            <p className="text-gray-500 text-sm mt-2">Check-in PIN</p>
          </div>
        )}

        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full text-center text-sm text-[--color-primary-red] hover:text-white transition-colors mt-4"
        >
          {showQR ? "Show PIN instead" : "Show QR Code"}
        </button>
      </div>

      {/* Next Class Card */}
      {mockMemberData.nextClass && (
        <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-[--color-primary-red] font-medium uppercase tracking-wide">
                Next Class
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                {mockMemberData.nextClass.name}
              </h3>
            </div>
            <div className="p-2 bg-[--color-primary-red]/10 rounded-lg">
              <svg
                className="w-6 h-6 text-[--color-primary-red]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{mockMemberData.nextClass.time}</span>
            <span>•</span>
            <span>{mockMemberData.nextClass.instructor}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="primary" className="flex-1">
              View Details
            </Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link
          to="/schedule"
          className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5 hover:border-[--color-primary-red]/50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-[--color-primary-red]/10 flex items-center justify-center mb-3 group-hover:bg-[--color-primary-red]/20 transition-colors">
            <svg
              className="w-6 h-6 text-[--color-primary-red]"
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
          </div>
          <h3 className="font-semibold text-white">Book Class</h3>
          <p className="text-sm text-gray-500 mt-1">View schedule</p>
        </Link>

        <Link
          to="/membership"
          className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5 hover:border-[--color-primary-red]/50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
            <svg
              className="w-6 h-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Membership</h3>
          <p className="text-sm text-gray-500 mt-1">View status</p>
        </Link>
      </div>

      {/* Streak Card */}
      {/* <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-5">
        <div className="flex items-center gap-4">
          <IconFlame size={40} stroke={2} className="text-amber-400" />
          <div>
            <p className="text-2xl font-bold text-white">
              {mockMemberData.streak} Day Streak!
            </p>
            <p className="text-sm text-amber-400/80">Keep it going!</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
