/**
 * @file SearchInput.tsx
 * @description Search input component with magnifying glass icon. Specifically
 * styled for search/filter functionality with icon prefix.
 *
 * @portal Both (Staff and Member)
 * @usage Used for search/filter inputs in list pages (Members, Classes, etc.)
 *
 * @features
 * - Magnifying glass icon (left side)
 * - Full width by default
 * - Dark theme styling matching other inputs
 * - Focus ring animation
 *
 * @example
 * <SearchInput
 *   value={search}
 *   onChange={setSearch}
 *   placeholder="Search by name or email..."
 * />
 */

/**
 * Props for the SearchInput component.
 */
interface SearchInputProps {
  /** Current search query value */
  value: string;
  /** Change handler receiving the new value */
  onChange: (value: string) => void;
  /** Placeholder text (default: "Search...") */
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg
          text-white placeholder-gray-500 text-sm
          focus:outline-none focus:ring-2 focus:ring-[--color-primary-red]/50 focus:border-[--color-primary-red]
          transition-all"
      />
    </div>
  );
}



