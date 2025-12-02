import type { ClassSummary, ClassRosterEntry } from '../../types/classes';
import Button from '../ui/Button';

interface ClassRosterProps {
  classSummary: ClassSummary | null;
  roster: ClassRosterEntry[];
  isLoading: boolean;
  onMarkPresent: (reservationId: string) => void;
  updatingReservationId: string | null;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function SkeletonRosterRow() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
        <div>
          <div className="w-32 h-4 bg-gray-700 rounded animate-pulse" />
          <div className="w-16 h-3 bg-gray-700/50 rounded animate-pulse mt-1.5" />
        </div>
      </div>
      <div className="w-24 h-8 bg-gray-700 rounded-lg animate-pulse" />
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function ClassRoster({
  classSummary,
  roster,
  isLoading,
  onMarkPresent,
  updatingReservationId,
}: ClassRosterProps) {
  if (!classSummary) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">Select a class</h3>
          <p className="text-gray-400">Choose a class from the list to view its roster.</p>
        </div>
      </div>
    );
  }

  const remaining = classSummary.reserved_count - classSummary.checked_in_count;
  const timeRange = `${formatTime(classSummary.start_time)} – ${formatTime(classSummary.end_time)}`;

  // Filter out cancelled reservations
  const activeRoster = roster.filter(entry => entry.status !== 'cancelled');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4 mb-4">
        <h2 className="text-xl font-bold text-white">{classSummary.name}</h2>
        <p className="text-gray-400 text-sm mt-1">{timeRange}</p>
        {classSummary.location && (
          <p className="text-gray-500 text-xs mt-0.5">{classSummary.location}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">{classSummary.reserved_count}</p>
          <p className="text-xs text-gray-400">Reserved</p>
        </div>
        <div className="bg-emerald-500/10 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-emerald-400">{classSummary.checked_in_count}</p>
          <p className="text-xs text-gray-400">Checked In</p>
        </div>
        <div className="bg-amber-500/10 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{remaining}</p>
          <p className="text-xs text-gray-400">Remaining</p>
        </div>
      </div>

      {/* Roster List */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-[--color-primary-red] uppercase tracking-wider mb-3">
          Roster
        </h3>

        {isLoading ? (
          <div>
            {[...Array(5)].map((_, i) => (
              <SkeletonRosterRow key={i} />
            ))}
          </div>
        ) : activeRoster.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No reservations for this class.</p>
          </div>
        ) : (
          <div>
            {activeRoster.map((entry) => (
              <div
                key={entry.reservation_id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-sm font-medium">
                    {getInitials(entry.member_name)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{entry.member_name}</p>
                    <span
                      className={`
                        inline-flex items-center text-xs px-2 py-0.5 rounded-full mt-1
                        ${entry.status === 'checked_in'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                        }
                      `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          entry.status === 'checked_in' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      {entry.status === 'checked_in' ? 'Checked in' : 'Reserved'}
                    </span>
                  </div>
                </div>

                <div>
                  {entry.status === 'reserved' ? (
                    <Button
                      size="sm"
                      onClick={() => onMarkPresent(entry.reservation_id)}
                      disabled={updatingReservationId === entry.reservation_id}
                    >
                      {updatingReservationId === entry.reservation_id ? (
                        <span className="flex items-center gap-1.5">
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          ...
                        </span>
                      ) : (
                        'Mark present'
                      )}
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" disabled>
                      <svg className="w-4 h-4 mr-1.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Present
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

