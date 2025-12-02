interface InputProps {
  label?: string;
  type?: "text" | "email" | "number" | "tel" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  value,
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
        onChange={(e) => onChange(e.target.value)}
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
