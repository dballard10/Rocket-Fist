/**
 * @file StatusBadge.tsx
 * @description Status indicator badge with colored background, text, and animated dot.
 * Used to display entity statuses (members, payments, reservations, etc.).
 *
 * @portal Both (Staff and Member)
 * @usage Used throughout for status indication on members, payments, classes, etc.
 *
 * @statuses
 * Member statuses: active, inactive, frozen, cancelled, delinquent, new
 * Payment statuses: succeeded, failed, refunded
 * Reservation statuses: registered, attended, no-show
 *
 * @colors
 * - Green (emerald): active, succeeded, attended
 * - Red: delinquent, failed, no-show
 * - Amber: cancelled, refunded
 * - Blue: new, registered
 * - Slate/Gray: inactive, frozen
 *
 * @example
 * <StatusBadge status="active" size="sm" />
 * <StatusBadge status="delinquent" />
 */

/**
 * Valid status types for the StatusBadge.
 * Covers member, payment, and reservation statuses.
 */
type StatusType =
  | "active"
  | "inactive"
  | "frozen"
  | "cancelled"
  | "delinquent"
  | "new"
  | "succeeded"
  | "failed"
  | "refunded"
  | "registered"
  | "attended"
  | "no-show";

/**
 * Props for the StatusBadge component.
 */
interface StatusBadgeProps {
  /** The status to display */
  status: StatusType;
  /** Badge size (sm = smaller text, md = default) */
  size?: "sm" | "md";
}

const statusConfig: Record<
  StatusType,
  { bg: string; text: string; label: string; circle: string }
> = {
  active: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Active",
    circle: "bg-emerald-400",
  },
  inactive: {
    bg: "bg-gray-500/20",
    text: "text-gray-400",
    label: "Inactive",
    circle: "bg-gray-400",
  },
  frozen: {
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    label: "Frozen",
    circle: "bg-slate-400",
  },
  cancelled: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    label: "Cancelled",
    circle: "bg-amber-400",
  },
  delinquent: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    label: "Delinquent",
    circle: "bg-red-400",
  },
  new: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "New",
    circle: "bg-blue-400",
  },
  succeeded: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Succeeded",
    circle: "bg-emerald-400",
  },
  failed: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    label: "Failed",
    circle: "bg-red-400",
  },
  refunded: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    label: "Refunded",
    circle: "bg-amber-400",
  },
  registered: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "Registered",
    circle: "bg-blue-400",
  },
  attended: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Attended",
    circle: "bg-emerald-400",
  },
  "no-show": {
    bg: "bg-red-500/20",
    text: "text-red-400",
    label: "No Show",
    circle: "bg-red-400",
  },
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.active;

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${config.bg} ${config.text}
        ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.circle} mr-1.5`}
      />
      {config.label}
    </span>
  );
}
