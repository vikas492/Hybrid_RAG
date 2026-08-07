import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Main Content Area filling remaining space with ZERO bottom padding */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 h-full w-full min-w-0 p-0 sm:p-4 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}