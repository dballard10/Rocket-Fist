/**
 * @file Button.tsx
 * @description Reusable button component with multiple variants and sizes.
 * Used throughout the application for actions and form submissions.
 *
 * @portal Both (Staff and Member)
 * @usage Core UI component used in all pages and components
 *
 * @variants
 * - primary: Red background, white text (main CTAs)
 * - secondary: Gray background, white text (secondary actions)
 * - ghost: Transparent with hover state (tertiary actions)
 * - danger: Red background for destructive actions
 *
 * @sizes
 * - sm: Compact (px-3 py-1.5, text-xs)
 * - md: Default (px-4 py-2, text-sm)
 * - lg: Large (px-5 py-2.5, text-base)
 *
 * @example
 * <Button variant="primary" onClick={handleSubmit}>Submit</Button>
 * <Button variant="ghost" size="sm" icon={<Icon />}>Cancel</Button>
 */

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** Button content (text, icons, or any React nodes) */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: () => void;
  /** Visual style variant */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button type for form submission */
  type?: "button" | "submit";
  /** Additional CSS classes */
  className?: string;
  /** Optional icon to display before children */
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-[--color-primary-red] hover:bg-[--color-primary-red-dark] text-white focus:ring-[--color-primary-red]",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    ghost:
      "bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}



