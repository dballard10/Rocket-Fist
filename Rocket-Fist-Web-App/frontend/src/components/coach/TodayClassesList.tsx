/**
 * @file TodayClassesList.tsx
 * @description List container component displaying today's classes for the Coach page.
 * Renders a vertical list of TodayClassRow components with selection state management.
 * Shows loading skeletons and empty states as appropriate.
 *
 * @portal Staff
 * @roles coach (primary), owner
 * @usage Used in Coach.tsx (pages/Coach.tsx)
 *
 * @features
 * - Renders list of TodayClassRow components
 * - Loading skeleton state with 4 placeholder rows
 * - Empty state when no classes scheduled for today
 * - Selection highlighting passed to child rows
 *
 * @props
 * @param {ClassSummary[]} classes - Array of today's class summaries
 * @param {string | null} selectedClassId - ID of the currently selected class
 * @param {(id: string) => void} onSelectClass - Callback when a class is selected
 * @param {boolean} isLoading - Whether class data is being fetched
 */

import type { ClassSummary } from '../../types/classes';
import TodayClassRow from './TodayClassRow';

/**
 * Props for the TodayClassesList component.
 */
interface TodayClassesListProps {
  /** Array of today's class summaries to display */
  classes: ClassSummary[];
  /** ID of the currently selected class, or null */
  selectedClassId: string | null;
  /** Callback fired when a class row is clicked */
  onSelectClass: (id: string) => void;
  /** Whether the class list is currently loading */
  isLoading: boolean;
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-700 px-4 py-3">
      <div className="flex-1">
        <div className="w-36 h-5 bg-gray-700 rounded animate-pulse" />
        <div className="w-28 h-4 bg-gray-700/50 rounded animate-pulse mt-1.5" />
      </div>
      <div className="flex items-center gap-3 ml-4">
        <div className="text-right space-y-1">
          <div className="w-16 h-4 bg-gray-700/50 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-700/50 rounded animate-pulse" />
        </div>
        <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function TodayClassesList({
  classes,
  selectedClassId,
  onSelectClass,
  isLoading,
}: TodayClassesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No classes today</h3>
        <p className="text-gray-400">No classes are scheduled for today.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {classes.map((classSummary) => (
        <TodayClassRow
          key={classSummary.id}
          classSummary={classSummary}
          isSelected={selectedClassId === classSummary.id}
          onSelect={() => onSelectClass(classSummary.id)}
        />
      ))}
    </div>
  );
}




