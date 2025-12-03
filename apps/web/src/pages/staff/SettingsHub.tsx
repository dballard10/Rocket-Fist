/**
 * @file SettingsHub.tsx
 * @description Combined settings page with tabbed navigation. Consolidates
 * Billing, Settings, and Account into a single nav item with tabs
 * controlled via URL query params.
 *
 * @portal Staff
 * @roles owner (exclusive access)
 * @route /settings
 *
 * @tabs
 * - "Billing" - Payment history and summaries
 * - "Gym Settings" - Gym info and staff management
 * - "Account" - Personal account settings
 *
 * @query_params
 * - ?tab=billing - Billing and payments
 * - ?tab=gym - Gym settings (default)
 * - ?tab=account - Account settings
 */

import { useSearchParams } from "react-router-dom";
import { Tabs } from "@rocket-fist/ui";

// Import the actual page content components
import Billing from "../Billing";
import GymSettings from "./GymSettings";
import StaffAccount from "./Account";

// Tab configurations for owner
const settingsTabs = [
  { id: "billing", label: "Billing" },
  { id: "gym", label: "Gym Settings" },
  { id: "account", label: "Account" },
];

export default function SettingsHub() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current tab from URL or use default
  const currentTab = searchParams.get("tab") || "billing";

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (currentTab) {
      case "billing":
        return <Billing />;
      case "gym":
        return <GymSettings />;
      case "account":
        return <StaffAccount />;
      default:
        return <Billing />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          tabs={settingsTabs}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Tab Content - Remove duplicate headers from child components */}
      <div className="settings-hub-content">{renderContent()}</div>

      {/* Style to hide duplicate headers from embedded pages */}
      <style>{`
        .settings-hub-content > div > .container {
          padding: 0;
        }
        .settings-hub-content > div > .container > h1,
        .settings-hub-content > div > .container > div:first-child > h1,
        .settings-hub-content > div > .container > .mb-6:first-child {
          display: none;
        }
        .settings-hub-content > div > .container > p.text-gray-400.mt-1 {
          display: none;
        }
      `}</style>
    </div>
  );
}
