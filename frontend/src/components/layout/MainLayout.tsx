import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="mx-auto h-full w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}