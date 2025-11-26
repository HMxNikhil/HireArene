import React, { useState } from "react";

import Navbar from "./components/Navbar";
import RecruiterPage from "./pages/RecruiterPage";
import ApplicantPage from "./pages/ApplicantPage";
import DashboardPage from "./pages/DashboardPage";

// New UI Enhancements
import FloatingShapes from "./components/FloatingShapes";
import DarkToggle from "./components/DarkToggle";
import PageTransition from "./components/UI/PageTransition";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/recruiter");

  const renderPage = () => {
    switch (currentPath) {
      case "/recruiter":
        return <RecruiterPage />;
      case "/applicant":
        return <ApplicantPage />;
      case "/dashboard":
        return <DashboardPage />;
      default:
        return <RecruiterPage />;
    }
  };

  return (
    <div
      className="
        min-h-screen 
        bg-[linear-gradient(to_bottom_right,#EEE2DF,#DEC1DB,#AFC4F8)]
        bg-fixed 
        text-slate-900
        relative
        overflow-x-hidden
      "
    >
      {/* Floating Background Shapes */}
      <FloatingShapes />

      {/* Navigation */}
      <Navbar currentPath={currentPath} navigate={setCurrentPath} />

      <main className="max-w-6xl mx-auto px-4 py-8 relative">

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <DarkToggle />
        </div>

        {/* Page Animation Wrapper */}
        <PageTransition locationKey={currentPath}>
          {renderPage()}
        </PageTransition>
      </main>
    </div>
  );
}
