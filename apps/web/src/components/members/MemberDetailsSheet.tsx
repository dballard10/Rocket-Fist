/**
 * @file MemberDetailsSheet.tsx
 * @description Slide-over sheet component displaying detailed member information.
 * Opens from the right side of the screen when a member is selected from the list.
 * Shows basic info, membership details, and activity summary.
 *
 * @portal Staff
 * @roles owner, employee, coach (all staff roles)
 * @usage Used in Members.tsx (pages/Members.tsx)
 *
 * @features
 * - Slide-over panel from right edge
 * - Click-away to close (no visible backdrop)
 * - Escape key to close
 * - Header with avatar, name, status badge
 * - Sections:
 *   - Basic Information: full name, email, phone, member since
 *   - Membership: plan, status, next billing date
 *   - Activity: last check-in, visits this month
 * - Footer actions: Edit Member, View Full History
 *
 * @props
 * @param {Member | null} member - The member to display, or null when closed
 * @param {boolean} open - Whether the sheet is visible
 * @param {(open: boolean) => void} onOpenChange - Callback when open state changes
 */

import { useEffect } from "react";
import type { Member } from "@rocket-fist/domain";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";

/**
 * Props for the MemberDetailsSheet component.
 */
interface MemberDetailsSheetProps {
  /** The member to display, or null if no member selected */
  member: Member | null;
  /** Whether the sheet is currently visible */
  open: boolean;
  /** Callback fired when the sheet should open or close */
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return "Never";

  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365)
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatMemberSince(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function MemberDetailsSheet({
  member,
  open,
  onOpenChange,
}: MemberDetailsSheetProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  if (!open || !member) return null;

  const fullName = `${member.first_name} ${member.last_name}`;

  const handleEditMember = () => {
    // TODO: Implement edit member functionality
    console.log("Edit member:", member.id);
  };

  const handleViewHistory = () => {
    // TODO: Implement view full history functionality
    console.log("View history:", member.id);
  };

  return (
    <>
      {/* Invisible click-away area (no visual overlay) */}
      <div className="fixed inset-0 z-50" onClick={() => onOpenChange(false)} />

      {/* Sheet */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full sm:w-[420px] max-w-full z-50
          bg-gray-900 opacity-90 border-l border-gray-700
          shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-lg font-semibold">
              {getInitials(member.first_name, member.last_name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{fullName}</h2>
              <StatusBadge status={member.status} size="sm" />
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 -m-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
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
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <section>
            <h3 className="text-sm font-medium text-[--color-primary-red] mb-4 uppercase tracking-wider">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">
                  Full Name
                </label>
                <p className="text-white mt-1">{fullName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">
                  Email
                </label>
                <p className="text-white mt-1">{member.email}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">
                  Phone
                </label>
                <p className="text-white mt-1">{member.phone || "—"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">
                  Member Since
                </label>
                <p className="text-white mt-1">
                  {formatMemberSince(member.created_at)}
                </p>
              </div>
            </div>
          </section>

          {/* Membership */}
          <section>
            <h3 className="text-sm font-medium text-[--color-primary-red] mb-4 uppercase tracking-wider">
              Membership
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Plan</span>
                <span className="text-white font-medium">
                  {member.membership_plan || "No plan"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <StatusBadge status={member.status} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Next Billing</span>
                <span className="text-white">
                  {formatDate(member.next_billing_date)}
                </span>
              </div>
            </div>
          </section>

          {/* Activity */}
          <section>
            <h3 className="text-sm font-medium text-[--color-primary-red] mb-4 uppercase tracking-wider">
              Activity
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Check-in</span>
                <span className="text-white">
                  {formatRelativeDate(member.last_check_in_at)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Visits this month</span>
                <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
                  —
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleEditMember}
          >
            Edit Member
          </Button>
          <Button variant="ghost" onClick={handleViewHistory}>
            View Full History
          </Button>
        </div>
      </div>
    </>
  );
}
