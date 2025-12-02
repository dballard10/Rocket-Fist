interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
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
