/**
 * @file WidgetCard.tsx
 * @description Reusable card container component for dashboard widgets and content
 * sections. Provides consistent styling with dark background, border, and red title.
 *
 * @portal Both (Staff and Member)
 * @usage Used throughout for content containers on Dashboard, Members, Schedule, etc.
 *
 * @features
 * - Dark background with subtle border
 * - Red title text (primary brand color)
 * - Responsive padding (smaller on mobile)
 * - Optional className for additional styling
 *
 * @example
 * <WidgetCard title="Active Members">
 *   <p className="text-4xl font-bold text-white">142</p>
 * </WidgetCard>
 *
 * <WidgetCard title="" className="overflow-x-auto">
 *   <table>...</table>
 * </WidgetCard>
 */

/**
 * Props for the WidgetCard component.
 */
interface WidgetCardProps {
  /** Title displayed at the top of the card (can be empty string) */
  title: string;
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export default function WidgetCard({ title, children, className = '' }: WidgetCardProps) {
  return (
    <div className={`bg-[--color-background-dark] rounded-lg p-4 md:p-6 border border-gray-800 ${className}`}>
      <h2 className="text-[--color-primary-red] text-lg md:text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

