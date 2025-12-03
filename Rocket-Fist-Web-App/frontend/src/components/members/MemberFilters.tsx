/**
 * @file MemberFilters.tsx
 * @description Filter controls component for the Members page. Provides search
 * and dropdown filters for filtering the member list by name/email, status,
 * and membership plan.
 *
 * @portal Staff
 * @roles owner, employee, coach (all staff roles)
 * @usage Used in Members.tsx (pages/Members.tsx)
 *
 * @features
 * - Search input for filtering by name or email
 * - Status dropdown (All, Active, Frozen, Cancelled, Delinquent, New)
 * - Plan dropdown (dynamically populated from available plans)
 * - Responsive layout (stacked on mobile, inline on desktop)
 *
 * @props
 * @param {string} search - Current search query value
 * @param {string} status - Current status filter value
 * @param {string} plan - Current plan filter value
 * @param {string[]} plans - Array of available membership plan names
 * @param {(value: string) => void} onSearchChange - Callback when search changes
 * @param {(value: string) => void} onStatusChange - Callback when status filter changes
 * @param {(value: string) => void} onPlanChange - Callback when plan filter changes
 */

import SearchInput from '../ui/SearchInput';
import Select from '../ui/Select';

/**
 * Props for the MemberFilters component.
 */
interface MemberFiltersProps {
  /** Current search query string */
  search: string;
  /** Current status filter value ('all' or specific status) */
  status: string;
  /** Current plan filter value ('all' or specific plan name) */
  plan: string;
  /** Array of available membership plan names for the dropdown */
  plans: string[];
  /** Callback fired when search input changes */
  onSearchChange: (value: string) => void;
  /** Callback fired when status filter changes */
  onStatusChange: (value: string) => void;
  /** Callback fired when plan filter changes */
  onPlanChange: (value: string) => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'delinquent', label: 'Delinquent' },
  { value: 'new', label: 'New' },
] as const;

export default function MemberFilters({
  search,
  status,
  plan,
  plans,
  onSearchChange,
  onStatusChange,
  onPlanChange,
}: MemberFiltersProps) {
  const planOptions = [
    { value: 'all', label: 'All Plans' },
    ...plans.map((p) => ({ value: p, label: p })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name or email..."
        />
      </div>
      <div className="flex gap-3">
        <Select
          value={status}
          onChange={onStatusChange}
          options={[...statusOptions]}
          className="sm:w-40"
        />
        <Select
          value={plan}
          onChange={onPlanChange}
          options={planOptions}
          className="sm:w-48"
        />
      </div>
    </div>
  );
}

