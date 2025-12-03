/**
 * @file Settings.tsx (Staff)
 * @description Staff settings settings page. Allows staff members to view and edit
 * their profile information, manage security settings, and configure notification
 * preferences.
 *
 * @portal Staff
 * @roles owner, coach, employee (all staff members)
 * @route /settings
 *
 * @features
 * - Profile section:
 *   - View/edit display name, email, phone
 *   - Avatar with initial
 *   - Role badge display
 * - Security section:
 *   - Change password option
 *   - Two-factor authentication toggle
 * - Notifications section:
 *   - Email notification toggle
 *   - Class reminder toggle
 *
 * @note
 * This is the STAFF version of the settings page.
 * Members have a separate settings page at pages/member/Settings.tsx
 *
 * @data
 * - Uses useCurrentUser hook for user data
 * - Uses useDevRole for role context
 */

import { useState } from "react";
import { useCurrentUser, getUserDisplayName } from "../../lib/auth/currentUser";
import { useDevRole, getRoleInfo } from "../../lib/devRoleMode";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function StaffAccount() {
  const { user } = useCurrentUser();
  const { viewRole } = useDevRole();
  const roleInfo = getRoleInfo(viewRole);
  const [isEditing, setIsEditing] = useState(false);

  const displayName = getUserDisplayName(user);
  const email = user?.email || "staff@rocketfist.com";

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Account</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {displayName}
                </h2>
                <p className="text-gray-400">{email}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${roleInfo.bgColor} ${roleInfo.color}`}
                >
                  {roleInfo.label}
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <Input
                label="Display Name"
                defaultValue={displayName}
                placeholder="Enter your name"
              />
              <Input
                label="Email"
                type="email"
                defaultValue={email}
                placeholder="Enter your email"
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
              />
              <div className="pt-2">
                <Button variant="primary" onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Role</span>
                <span className="text-white capitalize">{viewRole}</span>
              </div>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-[--color-primary-red] mb-4">
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
                Change Password
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-medium">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[--color-background-dark] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-[--color-primary-red] mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive updates via email
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
                <p className="text-white">Class Reminders</p>
                <p className="text-sm text-gray-500">
                  Get reminded about upcoming classes
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[--color-primary-red] focus:ring-[--color-primary-red] focus:ring-offset-gray-900"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
