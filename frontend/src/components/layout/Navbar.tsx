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
  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    cn(
      "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-medium transition duration-200",
      "text-muted-foreground hover:bg-muted hover:text-foreground",
      isActive &&
        "bg-primary text-primary-foreground shadow-soft hover:bg-primary"
    );

  return (
    <header className="sticky top-0 z-50 h-200 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-8">

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open Sidebar"
            aria-expanded="false"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <NavLink
            to={ROUTES.dashboard}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
              <DatabaseZap className="h-5 w-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight sm:text-lg">
                Hybrid RAG
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                AI Knowledge Assistant
              </span>
            </div>
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to={ROUTES.dashboard}
            className={linkClass}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to={ROUTES.chat}
            className={linkClass}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.innerWidth < 1024
              ) {
                onToggleSidebar();
              }
            }}
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </NavLink>

          <NavLink
            to={ROUTES.upload}
            className={linkClass}
          >
            <Upload className="h-4 w-4" />
            Upload
          </NavLink>
        </div>
      </div>
    </header>
  );
}