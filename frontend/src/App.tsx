import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DevRoleProvider } from "./lib/devRoleMode";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Members from "./pages/Members";
import MemberDetail from "./pages/MemberDetail";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Billing from "./pages/Billing";
import Coach from "./pages/Coach";

function App() {
  return (
    <DevRoleProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Header />
          <main className="pt-16 pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/members/:id" element={<MemberDetail />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/coach" element={<Coach />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DevRoleProvider>
  );
}

export default App;
