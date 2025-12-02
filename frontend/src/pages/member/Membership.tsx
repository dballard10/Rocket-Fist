/**
 * @file Membership.tsx
 * @description Membership status and billing management page for the Member Portal.
 * Displays current plan details, payment method, billing history, and provides
 * access to the Stripe customer portal for self-service billing management.
 *
 * @portal Member
 * @roles member (gym members only)
 * @route /membership
 *
 * @features
 * - Current plan card:
 *   - Plan name, status badge, monthly price
 *   - Next billing date
 *   - Change plan and pause buttons
 * - Payment method section:
 *   - Card brand, last 4 digits, expiry
 *   - Update payment method button
 * - Billing history:
 *   - List of past payments with date, amount, status
 *   - "View All" for full history
 * - Stripe portal link:
 *   - Opens Stripe's hosted billing portal
 *   - Full self-service billing management
 * - Cancel membership option (at bottom)
 *
 * @integration
 * - Stripe Customer Portal for billing self-service
 * - Stripe Subscriptions for plan management
 *
 * @data
 * - Currently uses mock data (to be replaced with Stripe API data)
 */

import Button from "../../components/ui/Button";

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

export default function Membership() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Membership
        </h1>
        <p className="text-gray-400 mt-1">Manage your plan and billing</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-[--color-primary-red]/20 to-transparent rounded-2xl border border-[--color-primary-red]/30 p-6 mb-6">
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
      <div className="bg-[--color-background-dark] rounded-xl border border-gray-800 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Payment Method</h3>
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
          <h3 className="text-lg font-semibold text-white">Billing History</h3>
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
                <p className="text-sm text-gray-500">{mockMembership.plan}</p>
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
      <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-800">
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
      <div className="mt-8 pt-6 border-t border-gray-800">
        <button className="text-sm text-gray-500 hover:text-red-400 transition-colors">
          Cancel Membership
        </button>
      </div>
    </div>
  );
}
