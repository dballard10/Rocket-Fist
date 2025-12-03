/**
 * @file ClassesHub.tsx
 * @description Combined classes page with tabbed navigation. Consolidates
 * Classes (templates), Schedule, and My Classes (coach view) into a single
 * nav item with inline tabs next to the title.
 *
 * @portal Staff
 * @roles owner, coach, employee
 * @route /classes
 *
 * @tabs
 * - Owner/Employee: "Classes" (class templates), "Schedule" (weekly calendar)
 * - Coach: "My Classes" (today's roster), "Schedule" (weekly calendar)
 *
 * @query_params
 * - ?tab=templates - Class templates (owner/employee default)
 * - ?tab=schedule - Weekly schedule
 * - ?tab=my-classes - Coach's today view (coach default)
 */

import { useSearchParams } from "react-router-dom";
import { useDevRole } from "../../lib/devRoleMode";

// Import the actual page content components
import Classes from "../Classes";
import Schedule from "../Schedule";
import Coach from "../Coach";

// Tab configurations by role
const ownerEmployeeTabs = [
  { id: "templates", label: "Classes" },
  { id: "schedule", label: "Schedule" },
];

const coachTabs = [
  { id: "my-classes", label: "My Classes" },
  { id: "schedule", label: "Schedule" },
];

export default function ClassesHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { viewRole } = useDevRole();

  const isCoach = viewRole === "coach";
  const tabs = isCoach ? coachTabs : ownerEmployeeTabs;
  const defaultTab = isCoach ? "my-classes" : "templates";

  // Get current tab from URL or use default
  const currentTab = searchParams.get("tab") || defaultTab;

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (currentTab) {
      case "templates":
        return <Classes />;
      case "schedule":
        return <Schedule />;
      case "my-classes":
        return <Coach />;
      default:
        // Fallback to role-appropriate default
        return isCoach ? <Coach /> : <Classes />;
    }
  };

  // Get the first tab (Classes/My Classes) and second tab (Schedule)
  const firstTab = tabs[0];
  const secondTab = tabs[1];
  const isFirstTabActive = currentTab === firstTab.id;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header with Title-as-Tabs */}
      <div className="flex items-center gap-4 mb-6">
        {/* First Tab (Classes/My Classes) */}
        {isFirstTabActive ? (
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {firstTab.label}
          </h1>
        ) : (
          <button
            onClick={() => handleTabChange(firstTab.id)}
            className="text-2xl md:text-3xl font-bold text-gray-500 hover:text-gray-300 transition-colors"
          >
            {firstTab.label}
          </button>
        )}

        {/* Second Tab (Schedule) */}
        {!isFirstTabActive ? (
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {secondTab.label}
          </h1>
        ) : (
          <button
            onClick={() => handleTabChange(secondTab.id)}
            className="text-2xl md:text-3xl font-bold text-gray-500 hover:text-gray-300 transition-colors"
          >
            {secondTab.label}
          </button>
        )}
      </div>

      {/* Tab Content - Remove duplicate headers from child components */}
      <div className="classes-hub-content">{renderContent()}</div>

      {/* Style to hide duplicate headers from embedded pages */}
      <style>{`
        .classes-hub-content > div > .container {
          padding: 0;
        }
        .classes-hub-content > div > .container > div:first-child {
          display: none;
        }
      `}</style>
    </div>
  );
}
