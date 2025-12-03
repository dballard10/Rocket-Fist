/**
 * @file Billing.tsx
 * @description Billing and payments management page for the Staff Portal.
 * Displays payment summaries and transaction history with filtering capabilities.
 * This page is restricted to gym owners only.
 *
 * @portal Staff
 * @roles owner (exclusive access)
 * @route /billing
 *
 * @features
 * - Summary cards showing:
 *   - Total collected payments
 *   - Failed payment amounts
 *   - Refunded amounts
 * - Payment history table with:
 *   - Date, member name, description, amount, status
 *   - Search by member name
 *   - Filter by payment status (succeeded, failed, refunded)
 * - Responsive mobile card / desktop table views
 *
 * @note
 * Payment processing is handled via Stripe integration.
 * This page is for viewing/reporting only.
 *
 * @data
 * - Currently uses mockPayments (to be replaced with Stripe webhook data)
 */

import { useState, useMemo } from "react";
import WidgetCard from "../components/WidgetCard";
import SearchInput from "../components/ui/SearchInput";
import Select from "../components/ui/Select";
import StatusBadge from "../components/ui/StatusBadge";
import type { Payment } from "../data/mockData";
import { mockPayments } from "../data/mockData";

type StatusFilter = "all" | "succeeded" | "failed" | "refunded";

export default function Billing() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      const matchesSearch = payment.memberName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const formatDate = (dateStr: string) => {
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

  // Calculate totals
  const totals = useMemo(() => {
    const succeeded = mockPayments
      .filter((p) => p.status === "succeeded")
      .reduce((sum, p) => sum + p.amount, 0);
    const failed = mockPayments
      .filter((p) => p.status === "failed")
      .reduce((sum, p) => sum + p.amount, 0);
    const refunded = mockPayments
      .filter((p) => p.status === "refunded")
      .reduce((sum, p) => sum + p.amount, 0);

    return { succeeded, failed, refunded };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Billing
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[--color-background-dark] rounded-lg p-4 border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Collected</p>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(totals.succeeded)}
          </p>
        </div>
        <div className="bg-[--color-background-dark] rounded-lg p-4 border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-400">
            {formatCurrency(totals.failed)}
          </p>
        </div>
        <div className="bg-[--color-background-dark] rounded-lg p-4 border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Refunded</p>
          <p className="text-2xl font-bold text-amber-400">
            {formatCurrency(totals.refunded)}
          </p>
        </div>
      </div>

      <WidgetCard title="Recent Payments">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Filter by member name..."
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as StatusFilter)}
            options={[
              { value: "all", label: "All Status" },
              { value: "succeeded", label: "Succeeded" },
              { value: "failed", label: "Failed" },
              { value: "refunded", label: "Refunded" },
            ]}
            className="sm:w-40"
          />
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-white">{payment.memberName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(payment.date)}
                  </p>
                </div>
                <StatusBadge status={payment.status} size="sm" />
              </div>

              <p className="text-sm text-gray-400 mb-2">
                {payment.description}
              </p>

              <p
                className={`text-lg font-semibold ${
                  payment.status === "succeeded"
                    ? "text-emerald-400"
                    : payment.status === "failed"
                    ? "text-red-400"
                    : "text-amber-400"
                }`}
              >
                {formatCurrency(payment.amount)}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Date
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Member
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Description
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Amount
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-3 text-gray-400">
                    {formatDate(payment.date)}
                  </td>
                  <td className="py-3 px-3 text-white font-medium">
                    {payment.memberName}
                  </td>
                  <td className="py-3 px-3 text-gray-300">
                    {payment.description}
                  </td>
                  <td
                    className={`py-3 px-3 font-semibold ${
                      payment.status === "succeeded"
                        ? "text-emerald-400"
                        : payment.status === "failed"
                        ? "text-red-400"
                        : "text-amber-400"
                    }`}
                  >
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No payments found matching your criteria
            </div>
          )}
        </div>
      </WidgetCard>
    </div>
  );
}
