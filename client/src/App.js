import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
// import Transcriptions from "./pages/Transcriptions";
// import History from "./pages/History";
// import Patients from "./pages/Patients";
// import Settings from "./pages/Settings";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 p-4">
          <Routes>
            {/* Authenticated Routes */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transcriptions" element={<Transcriptions />} />
            <Route path="/history" element={<History />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} /> */}
            {/* Fallback Route */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
