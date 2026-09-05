import { useState, useEffect } from "react";
import NetworkBanner from "./NetworkBanner";
import NetworkBanner from "./NetworkBanner";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavigation from "./MobileNavigation";

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("vector-sidebar-collapsed") === "true"
  );

  useEffect(() => {
    localStorage.setItem("vector-sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Topbar />
        <NetworkBanner />
        <NetworkBanner />
      <div className="flex flex-1 min-h-0">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <main className="flex-1 min-w-0 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
