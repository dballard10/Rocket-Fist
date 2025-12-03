/**
 * @file TextArea.tsx
 * @description Multi-line text input component with label and styling matching
 * the Input component. Used for longer text content like descriptions and notes.
 *
 * @portal Both (Staff and Member)
 * @usage Used for description fields, notes, and other multi-line text
 *
 * @features
 * - Optional label with required indicator
 * - Configurable number of rows
 * - Non-resizable (resize-none)
 * - Dark theme styling matching Input component
 * - Focus ring animation
 *
 * @example
 * <TextArea
 *   label="Description"
 *   value={description}
 *   onChange={setDescription}
 *   rows={4}
 *   placeholder="Enter class description..."
 * />
 */

/**
 * Props for the TextArea component.
 */
interface TextAreaProps {
  /** Optional label text displayed above the textarea */
  label?: string;
  /** Current textarea value */
  value: string;
  /** Change handler receiving the new value */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Number of visible text rows (default: 3) */
  rows?: number;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Additional CSS classes for the wrapper */
  className?: string;
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  className = "",
}: TextAreaProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && (
            <span className="text-[--color-primary-red] ml-1">*</span>
          )}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="
          w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg
          text-white placeholder-gray-500 text-sm resize-none
          focus:outline-none focus:ring-2 focus:ring-[--color-primary-red]/50 focus:border-[--color-primary-red]
          transition-all
        "
      />
    </div>
  );
}



