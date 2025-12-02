import type { ClassSummary } from '../../types/classes';
import TodayClassRow from './TodayClassRow';

interface TodayClassesListProps {
  classes: ClassSummary[];
  selectedClassId: string | null;
  onSelectClass: (id: string) => void;
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


