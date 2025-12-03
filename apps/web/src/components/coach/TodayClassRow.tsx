/**
 * @file TodayClassRow.tsx
 * @description Individual class row component for the Coach page class list.
 * Displays class information in a clickable card format with selection styling.
 *
 * @portal Staff
 * @roles coach (primary), owner
 * @usage Used by TodayClassesList component
 *
 * @features
 * - Class name, time range, and location display
 * - Reserved and Checked In counts
 * - Selection indicator (red border and background when selected)
 * - Hover state with subtle background change
 * - Chevron icon indicating expandability
 *
 * @props
 * @param {ClassSummary} classSummary - The class data to display
 * @param {boolean} isSelected - Whether this row is currently selected
 * @param {() => void} onSelect - Callback when the row is clicked
 */

import type { ClassSummary } from '@rocket-fist/domain';

/**
 * Props for the TodayClassRow component.
 */
interface TodayClassRowProps {
  /** Class summary data to display */
  classSummary: ClassSummary;
  /** Whether this row is currently selected */
  isSelected: boolean;
  /** Callback fired when the row is clicked */
  onSelect: () => void;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function TodayClassRow({
  classSummary,
  isSelected,
  onSelect,
}: TodayClassRowProps) {
  const timeRange = `${formatTime(classSummary.start_time)} – ${formatTime(classSummary.end_time)}`;
  const remaining = classSummary.reserved_count - classSummary.checked_in_count;

  return (
    <button
      onClick={onSelect}
      className={`
        w-full flex items-center justify-between rounded-lg border px-4 py-3
        transition-all cursor-pointer text-left
        ${isSelected 
          ? 'border-[--color-primary-red] bg-[--color-primary-red]/10' 
          : 'border-gray-700 hover:bg-gray-800/50 hover:border-gray-600'
        }
      `}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{classSummary.name}</h3>
        <p className="text-sm text-gray-400 mt-0.5">{timeRange}</p>
        {classSummary.location && (
          <p className="text-xs text-gray-500 mt-0.5">{classSummary.location}</p>
        )}
      </div>

      <div className="flex items-center gap-3 ml-4 shrink-0">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Reserved</span>
            <span className="text-sm font-medium text-white">
              {classSummary.reserved_count}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">Checked in</span>
            <span className="text-sm font-medium text-emerald-400">
              {classSummary.checked_in_count}
            </span>
          </div>
        </div>
        
        <svg
          className={`w-5 h-5 transition-transform ${isSelected ? 'text-[--color-primary-red] rotate-90' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}




