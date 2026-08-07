import { NavLink } from "react-router-dom";
import {
  DatabaseZap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Upload,
} from "lucide-react";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition duration-200",
      "text-muted-foreground hover:bg-muted hover:text-foreground",
      isActive &&
        "bg-primary/10 text-primary hover:bg-primary/15 font-semibold"
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-5 lg:px-8">
        
        {/* Left Side: Mobile Hamburger Menu & App Branding */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open Sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-xs transition hover:bg-muted focus:outline-none lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <NavLink
            to={ROUTES.dashboard}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <DatabaseZap className="h-4 w-4 text-primary" />
            </div>

            <span className="text-sm font-semibold tracking-tight">
              Hybrid RAG
            </span>
          </NavLink>
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to={ROUTES.dashboard} className={linkClass}>
            <LayoutDashboard className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">Dashboard</span>
          </NavLink>

          <NavLink to={ROUTES.chat} className={linkClass}>
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">Chat</span>
          </NavLink>

          <NavLink to={ROUTES.upload} className={linkClass}>
            <Upload className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden xs:inline sm:inline">Upload</span>
          </NavLink>
        </div>

      </div>
    </header>
  );
}