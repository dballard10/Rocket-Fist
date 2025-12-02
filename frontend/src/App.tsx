import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DevRoleProvider, useDevRole, isStaffRole } from "./lib/devRoleMode";

// Layouts
import StaffLayout from "./layouts/StaffLayout";
import MemberLayout from "./layouts/MemberLayout";

// Staff Pages (existing)
import Dashboard from "./components/Dashboard";
import Members from "./pages/Members";
import MemberDetail from "./pages/MemberDetail";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Billing from "./pages/Billing";
import Coach from "./pages/Coach";

// Member Pages (to be created)
import MemberHome from "./pages/member/Home";
import MemberSchedule from "./pages/member/Schedule";
import Membership from "./pages/member/Membership";
import MemberAccount from "./pages/member/Account";

// Placeholder pages for new staff routes
import Attendance from "./pages/staff/Attendance";
import CheckIns from "./pages/staff/CheckIns";
import Settings from "./pages/staff/Settings";
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
          <Route path="/" element={<MemberHome />} />
          <Route path="/schedule" element={<MemberSchedule />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/account" element={<MemberAccount />} />
          {/* Catch-all redirect to home for members */}
          <Route path="*" element={<MemberHome />} />
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
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Coach-specific routes */}
        <Route path="/my-classes" element={<Coach />} />
        
        {/* Employee-specific routes */}
        <Route path="/check-ins" element={<CheckIns />} />
        
        {/* Shared staff routes */}
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<MemberDetail />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/account" element={<StaffAccount />} />
        
        {/* Legacy route redirect */}
        <Route path="/coach" element={<Coach />} />
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
