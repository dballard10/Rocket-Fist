/**
 * @file Dashboard.tsx
 * @description Main dashboard page for the Staff Portal. Displays key performance
 * indicators (KPIs) including active members, attendance, and upcoming classes.
 * Owner role sees additional financial metrics (revenue, MRR).
 *
 * @portal Staff
 * @roles owner (full view), coach, employee (limited view - no financial data)
 * @route / (root route for staff portal)
 *
 * @features
 * - Active members count
 * - Daily attendance tracking
 * - New members this month
 * - Revenue metrics (owner only)
 * - Monthly Recurring Revenue card (owner only)
 * - Upcoming classes table
 *
 * @example
 * // Rendered at root path for staff users
 * <Route path="/" element={<Dashboard />} />
 */

import { useDevRole } from "../lib/devRoleMode";
import { useCurrentUser, getUserDisplayName } from "../lib/auth/currentUser";
import WidgetCard from "./WidgetCard";

// Mock data for development - replace with Supabase queries
const mockData = {
  activeMembers: 142,
  attendanceToday: 38,
  newMembersThisMonth: 12,
  upcomingClasses: [
    {
      id: 1,
      name: "Boxing Fundamentals",
      time: "6:00 PM",
      instructor: "Mike Johnson",
    },
    { id: 2, name: "BJJ Advanced", time: "7:00 PM", instructor: "Sarah Chen" },
    {
      id: 3,
      name: "Muay Thai",
      time: "8:00 PM",
      instructor: "Tommy Rodriguez",
    },
    {
      id: 4,
      name: "MMA Conditioning",
      time: "9:00 PM",
      instructor: "Alex Kim",
    },
  ],
  // Owner-only data
  paymentsLast7Days: 4850,
  paymentsTrend: "+12%",
  mrr: 21250,
};

export default function Dashboard() {
  const { viewRole } = useDevRole();
  const { user } = useCurrentUser();
  const isOwner = viewRole === "owner";
  const isCoach = viewRole === "coach";

  // Get coach's name for filtering classes
  const coachName = isCoach ? getUserDisplayName(user) : null;

  // Filter classes by coach if viewing as coach
  const displayedClasses =
    isCoach && coachName
      ? mockData.upcomingClasses.filter(
          (classItem) => classItem.instructor === coachName
        )
      : mockData.upcomingClasses;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          isOwner ? "lg:grid-cols-4" : "lg:grid-cols-3"
        } gap-4 md:gap-6 mb-6 md:mb-8`}
      >
        {/* Active Members */}
        <WidgetCard title="Active Members">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              {mockData.activeMembers}
            </p>
            <p className="text-[--color-neutral-gray] text-sm mt-2">
              Total active memberships
            </p>
          </div>
        </WidgetCard>

        {/* Attendance Today */}
        <WidgetCard title="Attendance Today">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              {mockData.attendanceToday}
            </p>
            <p className="text-[--color-neutral-gray] text-sm mt-2">
              Members checked in today
            </p>
          </div>
        </WidgetCard>

        {/* New Members This Month - visible to all staff */}
        <WidgetCard title="New Members">
          <div className="flex flex-col">
            <p className="text-4xl md:text-5xl font-bold text-white">
              {mockData.newMembersThisMonth}
            </p>
            <p className="text-[--color-neutral-gray] text-sm mt-2">
              This month
            </p>
          </div>
        </WidgetCard>

        {/* Revenue - Owner Only */}
        {isOwner && (
          <WidgetCard title="Revenue (7 Days)">
            <div className="flex flex-col">
              <p className="text-4xl md:text-5xl font-bold text-white">
                ${mockData.paymentsLast7Days.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm mt-2 font-semibold">
                {mockData.paymentsTrend} from last week
              </p>
            </div>
          </WidgetCard>
        )}
      </div>

      {/* Owner-only: MRR Card */}
      {isOwner && (
        <div className="mb-6 md:mb-8">
          <WidgetCard title="Monthly Recurring Revenue">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  ${mockData.mrr.toLocaleString()}
                </p>
                <p className="text-[--color-neutral-gray] text-sm mt-2">
                  MRR from active memberships
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-emerald-400">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-lg font-semibold">+8%</span>
              </div>
            </div>
          </WidgetCard>
        </div>
      )}

      {/* Upcoming Classes Table */}
      <WidgetCard title={isCoach ? "My Upcoming Classes" : "Upcoming Classes"}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Class
                </th>
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Time
                </th>
                <th className="text-left py-3 px-2 text-[--color-primary-red] text-sm md:text-base font-semibold">
                  Instructor
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedClasses.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    No upcoming classes
                  </td>
                </tr>
              ) : (
                displayedClasses.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                  >
                    <td className="py-3 px-2 text-white text-sm md:text-base">
                      {classItem.name}
                    </td>
                    <td className="py-3 px-2 text-[--color-neutral-gray] text-sm md:text-base">
                      {classItem.time}
                    </td>
                    <td className="py-3 px-2 text-[--color-neutral-gray] text-sm md:text-base">
                      {classItem.instructor}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
