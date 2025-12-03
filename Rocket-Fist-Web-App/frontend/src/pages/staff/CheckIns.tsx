/**
 * @file CheckIns.tsx
 * @description Front desk check-in station page for the Staff Portal. Primary interface
 * for employees to search and check in members as they arrive at the gym. Includes
 * QR scanner placeholder for future barcode/QR code check-ins.
 *
 * @portal Staff
 * @roles employee (primary), owner (has access)
 * @route /check-ins
 *
 * @features
 * - Member search:
 *   - Search by name or email
 *   - Shows member status (active, frozen)
 *   - Last check-in timestamp
 *   - "Check In" button (disabled for non-active members)
 * - QR Scanner placeholder:
 *   - Reserved for future camera-based check-in
 * - Recent check-ins sidebar:
 *   - Shows last 5 check-ins in current session
 * - Today's classes sidebar:
 *   - Shows scheduled classes with reserved/checked-in counts
 *
 * @layout
 * - 2-column on desktop (main area + sidebar)
 * - Single column on mobile
 *
 * @todo
 * - Implement actual QR/barcode scanner
 * - Connect to Supabase for check-in recording
 * - Add check-in confirmation toast
 */

import { useState } from "react";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";

// Mock data for members
const mockMembers = [
  {
    id: "1",
    name: "Chris Martinez",
    email: "chris@example.com",
    status: "active",
    lastCheckin: "Today, 9:15 AM",
  },
  {
    id: "2",
    name: "Jordan Lee",
    email: "jordan@example.com",
    status: "active",
    lastCheckin: "Today, 9:12 AM",
  },
  {
    id: "3",
    name: "Morgan Chen",
    email: "morgan@example.com",
    status: "active",
    lastCheckin: "Yesterday",
  },
  {
    id: "4",
    name: "Taylor Brown",
    email: "taylor@example.com",
    status: "frozen",
    lastCheckin: "2 weeks ago",
  },
  {
    id: "5",
    name: "Alex Rivera",
    email: "alex@example.com",
    status: "active",
    lastCheckin: "Today, 9:02 AM",
  },
];

// Mock today's classes
const mockTodayClasses = [
  {
    id: "1",
    name: "Beginner BJJ",
    time: "9:00 AM",
    checkedIn: 8,
    reserved: 12,
  },
  {
    id: "2",
    name: "All-Levels BJJ",
    time: "12:00 PM",
    checkedIn: 0,
    reserved: 18,
  },
  {
    id: "3",
    name: "Muay Thai Fundamentals",
    time: "5:00 PM",
    checkedIn: 0,
    reserved: 15,
  },
  { id: "4", name: "Advanced MMA", time: "7:00 PM", checkedIn: 0, reserved: 8 },
];

export default function CheckIns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCheckins, setRecentCheckins] = useState<string[]>([]);

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckIn = (memberId: string, memberName: string) => {
    setRecentCheckins((prev) => [memberName, ...prev.slice(0, 4)]);
    // TODO: Call API to check in member
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Check-ins</h1>
        <p className="text-gray-400 mt-1">Search and check in members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Check-in Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-4">
            <h2 className="text-lg font-semibold text-[--color-primary-red] mb-4">
              Member Search
            </h2>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or email..."
            />

            {/* Search Results */}
            {searchQuery && (
              <div className="mt-4 divide-y divide-gray-800">
                {filteredMembers.length === 0 ? (
                  <p className="py-4 text-center text-gray-500">
                    No members found
                  </p>
                ) : (
                  filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="py-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-xs text-gray-600">
                          Last: {member.lastCheckin}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${
                              member.status === "active"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-blue-500/20 text-blue-400"
                            }
                          `}
                        >
                          {member.status}
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCheckIn(member.id, member.name)}
                          disabled={member.status !== "active"}
                        >
                          Check In
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* QR Scanner Placeholder */}
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-[--color-primary-red] mb-4">
              QR Scanner
            </h2>
            <div className="aspect-square max-w-sm mx-auto bg-gray-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-600 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">QR Scanner</p>
                <p className="text-gray-600 text-xs mt-1">
                  Camera access required
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Check-ins */}
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-4">
            <h2 className="text-lg font-semibold text-[--color-primary-red] mb-4">
              Recent Check-ins
            </h2>
            {recentCheckins.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No check-ins yet today
              </p>
            ) : (
              <div className="space-y-2">
                {recentCheckins.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded bg-emerald-500/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-white">{name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Classes */}
          <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-4">
            <h2 className="text-lg font-semibold text-[--color-primary-red] mb-4">
              Today's Classes
            </h2>
            <div className="space-y-3">
              {mockTodayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium text-sm">{cls.name}</p>
                    <span className="text-xs text-gray-400">{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-400">
                      {cls.checkedIn} checked in
                    </span>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-400">
                      {cls.reserved} reserved
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
