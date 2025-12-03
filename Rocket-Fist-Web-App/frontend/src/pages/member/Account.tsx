/**
 * @file Account.tsx (Member)
 * @description Member account page with profile management, attendance history,
 * and notification/security settings. Features a statistics header showing
 * training progress and achievements.
 *
 * @portal Member
 * @roles member (gym members only)
 * @route /account
 *
 * @features
 * - Profile header:
 *   - Avatar with initials
 *   - Name, email, member since date
 *   - Quick stats: total classes, this month, day streak, favorite class
 *
 * - Tabbed interface with 3 sections:
 *
 * 1. Profile tab:
 *   - View/edit personal information
 *   - Fields: name, email, phone, emergency contact
 *
 * 2. History tab:
 *   - Attendance history list
 *   - Class name, date, time for each entry
 *   - Load more pagination
 *
 * 3. Settings tab:
 *   - Notification preferences (class reminders, new class alerts, marketing)
 *   - Security options (change password, sign out)
 *
 * @note
 * This is the MEMBER version of the account page.
 * Staff have a separate account page at pages/staff/Account.tsx
 *
 * @data
 * - Currently uses mock data (to be replaced with authenticated user data)
 */

import { useState } from "react";
import { IconFlame } from "@tabler/icons-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

// Mock member data - replace with authenticated user data
const mockMember = {
  firstName: "Chris",
  lastName: "Martinez",
  email: "chris@example.com",
  phone: "(555) 123-4567",
  emergencyContact: "Maria Martinez - (555) 987-6543",
  memberSince: "March 2024",
};

// Mock attendance history
const mockAttendanceHistory = [
  { id: "1", className: "All-Levels BJJ", date: "Today", time: "9:15 AM" },
  {
    id: "2",
    className: "Muay Thai Fundamentals",
    date: "Yesterday",
    time: "5:00 PM",
  },
  { id: "3", className: "Beginner BJJ", date: "Dec 1", time: "9:00 AM" },
  { id: "4", className: "Boxing Cardio", date: "Nov 30", time: "6:00 AM" },
  { id: "5", className: "All-Levels BJJ", date: "Nov 29", time: "12:00 PM" },
];

// Mock stats
const mockStats = {
  totalClasses: 47,
  thisMonth: 12,
  streak: 12,
  favoriteClass: "BJJ",
};

export default function MemberAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "history" | "settings"
  >("profile");

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Account</h1>
        <p className="text-gray-400 mt-1">Your profile and settings</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {mockMember.firstName.charAt(0)}
            {mockMember.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              {mockMember.firstName} {mockMember.lastName}
            </h2>
            <p className="text-gray-400">{mockMember.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {mockMember.memberSince}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {mockStats.totalClasses}
            </p>
            <p className="text-xs text-gray-500">Total Classes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {mockStats.thisMonth}
            </p>
            <p className="text-xs text-gray-500">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400 flex items-center justify-center gap-1">
              {mockStats.streak}
              <IconFlame size={24} stroke={2} />
            </p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {mockStats.favoriteClass}
            </p>
            <p className="text-xs text-gray-500">Favorite</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["profile", "history", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
              ${
                activeTab === tab
                  ? "bg-[--color-primary-red] text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Personal Information
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" defaultValue={mockMember.firstName} />
                <Input label="Last Name" defaultValue={mockMember.lastName} />
              </div>
              <Input
                label="Email"
                type="email"
                defaultValue={mockMember.email}
              />
              <Input label="Phone" type="tel" defaultValue={mockMember.phone} />
              <Input
                label="Emergency Contact"
                defaultValue={mockMember.emergencyContact}
              />
              <div className="pt-2">
                <Button variant="primary" onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-800">
                <span className="text-gray-400">Name</span>
                <span className="text-white">
                  {mockMember.firstName} {mockMember.lastName}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-800">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{mockMember.email}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-800">
                <span className="text-gray-400">Phone</span>
                <span className="text-white">{mockMember.phone}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-400">Emergency Contact</span>
                <span className="text-white text-right">
                  {mockMember.emergencyContact}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Attendance History
          </h3>

          <div className="space-y-3">
            {mockAttendanceHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-white font-medium">{entry.className}</p>
                    <p className="text-sm text-gray-500">
                      {entry.date} at {entry.time}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ))}
          </div>

          <Button variant="secondary" className="w-full mt-4">
            Load More
          </Button>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Notifications
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <div>
                  <p className="text-white">Class Reminders</p>
                  <p className="text-sm text-gray-500">
                    Get notified before your classes
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[--color-primary-red] focus:ring-[--color-primary-red] focus:ring-offset-gray-900"
                />
              </label>
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <div>
                  <p className="text-white">New Class Alerts</p>
                  <p className="text-sm text-gray-500">
                    When new classes are added
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[--color-primary-red] focus:ring-[--color-primary-red] focus:ring-offset-gray-900"
                />
              </label>
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <div>
                  <p className="text-white">Marketing Emails</p>
                  <p className="text-sm text-gray-500">
                    Promotions and special offers
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[--color-primary-red] focus:ring-[--color-primary-red] focus:ring-offset-gray-900"
                />
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Security</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-800">
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-sm text-gray-500">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Sign Out</p>
                  <p className="text-sm text-gray-500">
                    Sign out of your account
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
