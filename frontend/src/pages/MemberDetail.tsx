import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WidgetCard from "../components/WidgetCard";
import Tabs from "../components/ui/Tabs";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import {
  mockMembers,
  getMemberAttendance,
  getMemberPayments,
} from "../data/mockData";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "membership",
    label: "Membership",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: "payments",
    label: "Payments",
    icon: (
      <svg
        className="w-4 h-4"
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
];

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const member = mockMembers.find((m) => m.id === id);
  const attendance = member ? getMemberAttendance(member.id) : [];
  const payments = member ? getMemberPayments(member.id) : [];

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-400">Member not found</h2>
          <Button className="mt-4" onClick={() => navigate("/members")}>
            Back to Members
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    if (dateStr === "-") return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/members")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Members
      </button>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-[--color-primary-red]/20 to-transparent rounded-xl p-4 sm:p-6 border border-gray-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[--color-primary-red] flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {member.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <StatusBadge status={member.status} />
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm">{member.plan}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Edit
            </Button>
            {member.status === "active" && (
              <Button variant="ghost" size="sm">
                Freeze
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <WidgetCard title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Email
                </label>
                <p className="text-white">{member.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Phone
                </label>
                <p className="text-white">{member.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Member Since
                </label>
                <p className="text-white">{formatDate(member.joinDate)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Emergency Contact
                </label>
                <p className="text-white">{member.emergencyContact || "-"}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-500 block mb-1">
                  Notes
                </label>
                <p className="text-white whitespace-pre-wrap">
                  {member.notes || "No notes"}
                </p>
              </div>
            </div>
          </WidgetCard>
        )}

        {activeTab === "membership" && (
          <WidgetCard title="Membership Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Current Plan
                </label>
                <p className="text-white font-medium">{member.plan}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Status
                </label>
                <StatusBadge status={member.status} />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Next Billing Date
                </label>
                <p className="text-white">
                  {formatDate(member.nextBillingDate)}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Stripe Customer ID
                </label>
                <p className="text-gray-400 font-mono text-sm">
                  {member.stripeCustomerId}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-white font-medium mb-4">Actions</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">
                  Change Plan
                </Button>
                <Button variant="secondary" size="sm">
                  Update Payment Method
                </Button>
                {member.status === "active" && (
                  <Button variant="ghost" size="sm">
                    Cancel Membership
                  </Button>
                )}
              </div>
            </div>
          </WidgetCard>
        )}

        {activeTab === "attendance" && (
          <WidgetCard title="Recent Attendance">
            <p className="text-gray-400 text-sm mb-4">Last 10 classes</p>

            {/* Mobile List */}
            <div className="md:hidden space-y-2">
              {attendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-white text-sm">{record.className}</p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(record.date)}
                    </p>
                  </div>
                  <StatusBadge status={record.status} size="sm" />
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Date
                    </th>
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Class
                    </th>
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <td className="py-3 text-gray-300">
                        {formatDate(record.date)}
                      </td>
                      <td className="py-3 text-white">{record.className}</td>
                      <td className="py-3">
                        <StatusBadge status={record.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {attendance.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No attendance records
              </p>
            )}
          </WidgetCard>
        )}

        {activeTab === "payments" && (
          <WidgetCard title="Payment History">
            {/* Mobile List */}
            <div className="md:hidden space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-gray-800/30 rounded-lg p-3 border border-gray-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-medium">
                      {formatCurrency(payment.amount)}
                    </p>
                    <StatusBadge status={payment.status} size="sm" />
                  </div>
                  <p className="text-gray-400 text-sm">{payment.description}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {formatDate(payment.date)}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Date
                    </th>
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Description
                    </th>
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Amount
                    </th>
                    <th className="text-left py-2 text-gray-400 text-sm font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <td className="py-3 text-gray-300">
                        {formatDate(payment.date)}
                      </td>
                      <td className="py-3 text-white">{payment.description}</td>
                      <td className="py-3 text-white font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={payment.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {payments.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No payment history
              </p>
            )}
          </WidgetCard>
        )}
      </div>
    </div>
  );
}
