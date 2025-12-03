/**
 * @file Input.tsx
 * @description Reusable text input component with label, validation, and error states.
 * Supports multiple input types and both controlled and uncontrolled usage.
 *
 * @portal Both (Staff and Member)
 * @usage Core UI component used in forms throughout the application
 *
 * @features
 * - Optional label with required indicator (red asterisk)
 * - Multiple input types: text, email, number, tel, password
 * - Controlled (value) or uncontrolled (defaultValue) modes
 * - Error state with red border and error message
 * - Consistent dark theme styling
 * - Focus ring animation
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   required
 *   error={errors.email}
 * />
 */

/**
 * Props for the Input component.
 */
interface InputProps {
  /** Optional label text displayed above the input */
  label?: string;
  /** Input type */
  type?: "text" | "email" | "number" | "tel" | "password";
  /** Controlled input value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Change handler receiving the new value string */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Error message to display below the input */
  error?: string;
}

export default function Input({
  label,
  type = "text",
  value,
  defaultValue,
  onChange,
  placeholder,
  required = false,
  className = "",
  error,
}: InputProps) {
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
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2.5 bg-gray-800/50 border rounded-lg
          text-white placeholder-gray-500 text-sm
          focus:outline-none focus:ring-2 focus:ring-[--color-primary-red]/50 focus:border-[--color-primary-red]
          transition-all
          ${error ? "border-red-500" : "border-gray-700"}
        `}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}



