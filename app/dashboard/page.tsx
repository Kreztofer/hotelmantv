"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Home from "../components/pages/Home";
import Facilities from "../components/pages/Facilities";
import Directory from "../components/pages/Directory";

const AffiliateDashboard = () => {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("v1") || "dashboard";

  return (
    <div className="flex h-screen bg-[#FFFFFF] text-black">
      <Sidebar />

      <main className="flex-1 py-4 pl-6 pr-8 overflow-y-auto">
        {currentStep === "home" && <Home />}
        {currentStep === "facilities" && <Facilities />}
        {currentStep === "directory" && <Directory />}
      </main>
    </div>
  );
};

export default AffiliateDashboard;
