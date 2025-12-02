/**
 * @file Select.tsx
 * @description Styled select dropdown component with custom chevron icon.
 * Provides a consistent appearance with other form inputs.
 *
 * @portal Both (Staff and Member)
 * @usage Used for dropdown selections (status filters, plan selection, etc.)
 *
 * @features
 * - Custom chevron dropdown icon
 * - Optional placeholder option
 * - Dark theme styling
 * - Focus ring animation
 * - Native select behavior (accessible)
 *
 * @example
 * <Select
 *   value={status}
 *   onChange={setStatus}
 *   options={[
 *     { value: 'all', label: 'All Status' },
 *     { value: 'active', label: 'Active' },
 *   ]}
 *   className="w-40"
 * />
 */

/**
 * Option item for the Select component.
 */
interface SelectOption {
  /** The value submitted when this option is selected */
  value: string;
  /** The display label shown to the user */
  label: string;
}

/**
 * Props for the Select component.
 */
interface SelectProps {
  /** Currently selected value */
  value: string;
  /** Change handler receiving the new selected value */
  onChange: (value: string) => void;
  /** Array of options to display */
  options: SelectOption[];
  /** Optional placeholder shown as first disabled option */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg
        text-white text-sm appearance-none cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[--color-primary-red]/50 focus:border-[--color-primary-red]
        transition-all
        ${className}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 0.5rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1.5em 1.5em",
        paddingRight: "2.5rem",
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}



