import type { Member } from '../../types/members';
import MemberRow from './MemberRow';
import StatusBadge from '../ui/StatusBadge';

interface MemberListProps {
  members: Member[];
  isLoading: boolean;
  onSelect: (member: Member) => void;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (diffDays < 30) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  const months = Math.floor(diffDays / 30);
  if (diffDays < 365) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-700 rounded animate-pulse" />
            <div className="w-40 h-3 bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="w-28 h-4 bg-gray-700 rounded animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="w-20 h-6 bg-gray-700 rounded-full animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="w-24 h-4 bg-gray-700 rounded animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="w-20 h-4 bg-gray-700 rounded animate-pulse" />
      </td>
      <td className="py-3 px-3">
        <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse ml-auto" />
      </td>
    </tr>
  );
}

function MobileSkeletonCard() {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
          <div className="space-y-2">
            <div className="w-28 h-4 bg-gray-700 rounded animate-pulse" />
            <div className="w-24 h-3 bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-16 h-6 bg-gray-700 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="space-y-1">
          <div className="w-16 h-3 bg-gray-700/50 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="w-16 h-3 bg-gray-700/50 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function MemberList({ members, isLoading, onSelect }: MemberListProps) {
  if (isLoading) {
    return (
      <>
        {/* Mobile Loading */}
        <div className="md:hidden space-y-3">
          {[...Array(5)].map((_, i) => (
            <MobileSkeletonCard key={i} />
          ))}
        </div>
        
        {/* Desktop Loading */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Member
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Plan
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Status
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Next Billing
                </th>
                <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Last Check-in
                </th>
                <th className="text-right py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No members found</h3>
        <p className="text-gray-400">No members match your current filters.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 cursor-pointer hover:border-gray-600 transition-colors"
            onClick={() => onSelect(member)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--color-primary-red] to-[--color-primary-red-dark] flex items-center justify-center text-white text-sm font-medium">
                  {getInitials(member.first_name, member.last_name)}
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-sm text-gray-400">{member.membership_plan || 'No plan'}</p>
                </div>
              </div>
              <StatusBadge status={member.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Next billing</p>
                <p className="text-gray-300">{formatDate(member.next_billing_date)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last check-in</p>
                <p className="text-gray-300">{formatRelativeDate(member.last_check_in_at)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Member
              </th>
              <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Plan
              </th>
              <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Status
              </th>
              <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Next Billing
              </th>
              <th className="text-left py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Last Check-in
              </th>
              <th className="text-right py-3 px-3 text-[--color-primary-red] text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <MemberRow key={member.id} member={member} onSelect={onSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

