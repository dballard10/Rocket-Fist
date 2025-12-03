/**
 * @file Tabs.tsx
 * @description Horizontal tab navigation component with optional icons.
 * Used for switching between content sections within a page.
 *
 * @portal Both (Staff and Member)
 * @usage Used in MemberDetail, Account pages, Settings, etc.
 *
 * @features
 * - Horizontal scrollable on mobile
 * - Active tab with red underline and background
 * - Optional icon per tab
 * - Smooth hover transitions
 * - Accessible nav/button structure
 *
 * @example
 * const tabs = [
 *   { id: 'profile', label: 'Profile', icon: <UserIcon /> },
 *   { id: 'history', label: 'History' },
 * ];
 *
 * <Tabs
 *   tabs={tabs}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 */

/**
 * Configuration for a single tab.
 */
interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
}

/**
 * Props for the Tabs component.
 */
interface TabsProps {
  /** Array of tab configurations */
  tabs: Tab[];
  /** ID of the currently active tab */
  activeTab: string;
  /** Callback fired when a tab is clicked */
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-700 overflow-x-auto scrollbar-hide">
      <nav className="flex space-x-1 min-w-max px-1" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-t-lg transition-all
              whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-[--color-primary-red] border-b-2 border-[--color-primary-red] bg-gray-800/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}



