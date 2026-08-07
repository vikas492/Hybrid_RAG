import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Sticky Navbar locked at the top */}
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      {/* Main Container taking up remaining height */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 h-full w-full min-w-0 overflow-y-auto">
          <div className="mx-auto h-full w-full max-w-6xl p-2 sm:p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}