interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
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

