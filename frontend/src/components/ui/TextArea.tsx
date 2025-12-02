interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
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
