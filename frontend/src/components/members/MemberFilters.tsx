import SearchInput from '../ui/SearchInput';
import Select from '../ui/Select';

interface MemberFiltersProps {
  search: string;
  status: string;
  plan: string;
  plans: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPlanChange: (value: string) => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'delinquent', label: 'Delinquent' },
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

