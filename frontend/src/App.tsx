import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DevRoleProvider, useDevRole, isStaffRole } from "./lib/devRoleMode";

// Layouts
import StaffLayout from "./layouts/StaffLayout";
import MemberLayout from "./layouts/MemberLayout";

// Staff Pages (existing)
import Dashboard from "./components/Dashboard";
import MemberDetail from "./pages/MemberDetail";

// Member Pages
import MemberDashboard from "./pages/member/Dashboard";
import MemberClasses from "./pages/member/Classes";
import MemberSettings from "./pages/member/Settings";

// Staff Hub Pages (consolidated navigation)
import ClassesHub from "./pages/staff/ClassesHub";
import MembersHub from "./pages/staff/MembersHub";
import SettingsHub from "./pages/staff/SettingsHub";
import CheckIns from "./pages/staff/CheckIns";
import StaffAccount from "./pages/staff/Account";

/**
 * Role-aware router that renders different layouts based on user role.
 */
function RoleBasedRouter() {
  const { viewRole, isDevMode } = useDevRole();

  // In dev mode, use the selected viewRole. In production, this would come from auth.
  const effectiveRole = isDevMode ? viewRole : viewRole; // Replace with actual auth role in production

  // If member role, show member portal
  if (!isStaffRole(effectiveRole)) {
    return (
      <Routes>
        <Route element={<MemberLayout />}>
          <Route path="/" element={<MemberDashboard />} />
          <Route path="/schedule" element={<MemberClasses />} />
          <Route path="/settings" element={<MemberSettings />} />
          {/* Legacy route redirects for backwards compatibility */}
          <Route
            path="/membership"
            element={<Navigate to="/settings?tab=membership" replace />}
          />
          <Route
            path="/account"
            element={<Navigate to="/settings?tab=account" replace />}
          />
          {/* Catch-all redirect to dashboard for members */}
          <Route path="*" element={<MemberDashboard />} />
        </Route>
      </Routes>
    );
  }

  // Staff roles (owner, coach, employee) get the staff layout
  return (
    <Routes>
      <Route element={<StaffLayout />}>
        {/* Owner-specific routes */}
        <Route path="/" element={<Dashboard />} />

        {/* Employee-specific routes */}
        <Route path="/check-ins" element={<CheckIns />} />

        {/* Consolidated hub pages with tabs */}
        <Route path="/members" element={<MembersHub />} />
        <Route path="/members/:id" element={<MemberDetail />} />
        <Route path="/classes" element={<ClassesHub />} />
        <Route path="/settings" element={<SettingsHub />} />
        <Route path="/account" element={<StaffAccount />} />

        {/* Legacy route redirects for backwards compatibility */}
        <Route
          path="/schedule"
          element={<Navigate to="/classes?tab=schedule" replace />}
        />
        <Route
          path="/attendance"
          element={<Navigate to="/members?tab=attendance" replace />}
        />
        <Route
          path="/billing"
          element={<Navigate to="/settings?tab=billing" replace />}
        />
        <Route
          path="/my-classes"
          element={<Navigate to="/classes?tab=my-classes" replace />}
        />
        <Route
          path="/coach"
          element={<Navigate to="/classes?tab=my-classes" replace />}
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <DevRoleProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <RoleBasedRouter />
        </div>
      </Router>
    </DevRoleProvider>
  );
}

export default App;
