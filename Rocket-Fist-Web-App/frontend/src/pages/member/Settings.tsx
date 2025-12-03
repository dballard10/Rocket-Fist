/**
 * @file Settings.tsx (Member)
 * @description Member settings page combining account and membership management.
 * Features a tabbed interface with Account and Membership sections.
 *
 * @portal Member
 * @roles member (gym members only)
 * @route /settings
 *
 * @features
 * - Tabbed interface with 2 sections:
 *
 * 1. Account tab:
 *   - Profile header with stats
 *   - Profile management (name, email, phone, emergency contact)
 *   - Attendance history
 *   - Notification preferences
 *   - Security settings
 *
 * 2. Membership tab:
 *   - Current plan details
 *   - Payment method management
 *   - Billing history
 *   - Stripe portal access
 *   - Cancel membership option
 *
 * @note
 * This combines the previous /account and /membership routes into a single
 * settings page with tabs for better navigation organization.
 *
 * @data
 * - Currently uses mock data (to be replaced with authenticated user data)
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

// Mock membership data - replace with Stripe subscription data
const mockMembership = {
  plan: "Unlimited Monthly",
  status: "active",
  price: 149,
  nextBilling: "January 15, 2025",
  startDate: "March 1, 2024",
  paymentMethod: {
    type: "card",
    last4: "4242",
    brand: "Visa",
  },
};

// Mock billing history
const mockBillingHistory = [
  { id: "1", date: "Dec 15, 2024", amount: 149, status: "paid" },
  { id: "2", date: "Nov 15, 2024", amount: 149, status: "paid" },
  { id: "3", date: "Oct 15, 2024", amount: 149, status: "paid" },
  { id: "4", date: "Sep 15, 2024", amount: 149, status: "paid" },
];

export default function MemberSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [accountTab, setAccountTab] = useState<
    "profile" | "history" | "settings"
  >("profile");

  // Get active tab from URL or default to "account"
  const activeTab = searchParams.get("tab") || "account";

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleTabChange("account")}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeTab === "account"
                ? "bg-[--color-primary-red] text-white"
                : "hover:bg-gray-800 text-gray-400 hover:text-white"
            }
          `}
        >
          Account
        </button>
        <button
          onClick={() => handleTabChange("membership")}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeTab === "membership"
                ? "bg-[--color-primary-red] text-white"
                : "hover:bg-gray-800 text-gray-400 hover:text-white"
            }
          `}
        >
          Membership
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 p-6">
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

          {/* Account Sub-tabs */}
          <div className="flex gap-2 mb-6">
            {(["profile", "history", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAccountTab(tab)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                  ${
                    accountTab === tab
                      ? "bg-[--color-primary-red] text-white"
                      : "hover:bg-gray-800 text-gray-400 hover:text-white"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Profile Sub-tab */}
          {accountTab === "profile" && (
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
                    <Input
                      label="First Name"
                      defaultValue={mockMember.firstName}
                    />
                    <Input
                      label="Last Name"
                      defaultValue={mockMember.lastName}
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    defaultValue={mockMember.email}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    defaultValue={mockMember.phone}
                  />
                  <Input
                    label="Emergency Contact"
                    defaultValue={mockMember.emergencyContact}
                  />
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(false)}
                    >
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

          {/* History Sub-tab */}
          {accountTab === "history" && (
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
                        <p className="text-white font-medium">
                          {entry.className}
                        </p>
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

          {/* Settings Sub-tab */}
          {accountTab === "settings" && (
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
                <h3 className="text-lg font-semibold text-white mb-4">
                  Security
                </h3>

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
      )}

      {/* Membership Tab */}
      {activeTab === "membership" && (
        <div className="space-y-6">
          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-[--color-primary-red]/20 to-transparent rounded-2xl border border-[--color-primary-red]/30 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-[--color-primary-red] font-medium uppercase tracking-wide">
                  Current Plan
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {mockMembership.plan}
                </h2>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full font-medium capitalize">
                {mockMembership.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Monthly Price</p>
                <p className="text-xl font-semibold text-white">
                  ${mockMembership.price}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Billing</p>
                <p className="text-xl font-semibold text-white">
                  {mockMembership.nextBilling}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1">
                Change Plan
              </Button>
              <Button variant="ghost" className="text-gray-400">
                Pause
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Payment Method
              </h3>
              <Button variant="ghost" size="sm">
                Update
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="text-white font-medium">
                  {mockMembership.paymentMethod.brand} ••••{" "}
                  {mockMembership.paymentMethod.last4}
                </p>
                <p className="text-sm text-gray-500">Expires 12/26</p>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Billing History
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="divide-y divide-gray-800">
              {mockBillingHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{payment.date}</p>
                    <p className="text-sm text-gray-500">
                      {mockMembership.plan}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${payment.amount}</p>
                    <span
                      className={`
                      text-xs font-medium capitalize
                      ${
                        payment.status === "paid"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }
                    `}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stripe Portal Link */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">
                  Need to update your billing info?
                </p>
                <p className="text-sm text-gray-500">
                  Manage everything in your billing portal
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Open Portal
              </Button>
            </div>
          </div>

          {/* Cancel Membership */}
          <div className="pt-6 border-t border-gray-800">
            <button className="text-sm text-gray-500 hover:text-red-400 transition-colors">
              Cancel Membership
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
