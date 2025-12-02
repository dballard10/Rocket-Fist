type StatusType =
  | "active"
  | "frozen"
  | "cancelled"
  | "delinquent"
  | "succeeded"
  | "failed"
  | "refunded"
  | "registered"
  | "attended"
  | "no-show";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

const statusConfig: Record<
  StatusType,
  { bg: string; text: string; label: string }
> = {
  active: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Active",
  },
  frozen: { bg: "bg-slate-500/20", text: "text-slate-400", label: "Frozen" },
  cancelled: {
    bg: "bg-gray-500/20",
    text: "text-gray-400",
    label: "Cancelled",
  },
  delinquent: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    label: "Delinquent",
  },
  succeeded: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Succeeded",
  },
  failed: { bg: "bg-red-500/20", text: "text-red-400", label: "Failed" },
  refunded: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    label: "Refunded",
  },
  registered: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "Registered",
  },
  attended: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    label: "Attended",
  },
  "no-show": { bg: "bg-red-500/20", text: "text-red-400", label: "No Show" },
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
        className={`w-1.5 h-1.5 rounded-full ${config.text.replace(
          "text-",
          "bg-"
        )} mr-1.5`}
      />
      {config.label}
    </span>
  );
}
