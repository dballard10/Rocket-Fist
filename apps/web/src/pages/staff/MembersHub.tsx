/**
 * @file MembersHub.tsx
 * @description Combined members page with tabbed navigation. Consolidates
 * Members list and Attendance statistics into a single nav item with tabs
 * controlled via URL query params.
 *
 * @portal Staff
 * @roles owner, coach
 * @route /members
 *
 * @tabs
 * - Owner/Coach: "Members" (member list), "Attendance" (attendance stats)
 * - Employee: No tabs (just shows Members - handled by route config)
 *
 * @query_params
 * - ?tab=members - Member list (default)
 * - ?tab=attendance - Attendance statistics
 */

import { useSearchParams } from "react-router-dom";
import { useDevRole } from "../../lib/devRoleMode";
import { Tabs } from "@rocket-fist/ui";

// Import the actual page content components
import Members from "../Members";
import Attendance from "./Attendance";

// Tab configurations - only owner and coach have attendance tab
const membersTabs = [
  { id: "members", label: "Members" },
  { id: "attendance", label: "Attendance" },
];

export default function MembersHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { viewRole } = useDevRole();

  // Only owner and coach see tabs (they have attendance access)
  const showTabs = viewRole === "owner" || viewRole === "coach";

  // Get current tab from URL or use default
  const currentTab = searchParams.get("tab") || "members";

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    if (currentTab === "attendance" && showTabs) {
      return <Attendance />;
    }
    return <Members />;
  };

  // If employee, just show Members without tabs wrapper
  if (!showTabs) {
    return <Members />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Members</h1>
        <p className="text-gray-400 mt-1">
          Manage members and track attendance
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          tabs={membersTabs}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Tab Content - Remove duplicate headers from child components */}
      <div className="members-hub-content">
        {renderContent()}
      </div>

      {/* Style to hide duplicate headers from embedded pages */}
      <style>{`
        .members-hub-content > div > .container {
          padding: 0;
        }
        .members-hub-content > div > .container > div:first-child,
        .members-hub-content > div > .container > .mb-6:first-child {
          display: none;
        }
        .members-hub-content > div > .container > p.text-gray-400 {
          display: none;
        }
      `}</style>
    </div>
  );
}



