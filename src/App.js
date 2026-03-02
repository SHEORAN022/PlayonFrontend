import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Banner from "./pages/Banner";
import MatchHighlights from "./pages/MatchHighlights";
import Scheduleadmin from "./pages/Scheduleadmin"; // ✅ disk pe yahi naam hai
import LiveTvAdmin from "./pages/Livetvadmin";
import Prematchadmin from "./pages/Prematchadmin";
import Adminuserspage from "./pages/Adminuserspage";
import Adminplanspage from "./pages/Adminplanspage";
function App() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname;

  /* ================= AUTH GUARD ================= */
  if (!token) {
    return <Login />;
  }

  /* ================= PAGE SWITCH ================= */
  switch (path) {
    case "/banner":
      return <Banner />;

    case "/highlights":
      return <MatchHighlights mode="public" />;

    case "/admin/highlights":
      return <MatchHighlights mode="admin" />;

    case "/schedule":
      return <Scheduleadmin />;
       case "/live-tv":          return <LiveTvAdmin />;


    case "/admin/prematch":
      return <Prematchadmin />;
        case "/admin/users":          
    return <Adminuserspage />;
   
    case "/admin/plans":          // ✅ PLANS PAGE
      return <Adminplanspage />;

    default:
      return <Dashboard />;
  }
}

export default App;