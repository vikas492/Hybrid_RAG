import { MessagesSquare, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { ROUTES } from "@/lib/constants";
import { NewChatButton } from "@/components/session/NewChatButton";
import { SessionList } from "@/components/session/SessionList";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* ======================= */}
      {/* Desktop Persistent Sidebar */}
      {/* ======================= */}
      <aside className="hidden md:flex md:w-[280px] lg:w-[320px] shrink-0 flex-col border-r border-border bg-card/70 backdrop-blur">
        <div className="border-b border-border p-4 lg:p-5">
          <NewChatButton />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="px-4 pt-4 lg:px-5 lg:pt-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <MessagesSquare className="h-4 w-4" />
              Recent Chats
            </div>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto px-3 pb-4">
            <SessionList onSelectSession={onClose} />
          </div>

          <div className="border-t border-border p-4">
            <NavLink to={ROUTES.upload}>
              <Button variant="secondary" className="w-full">
                Manage Documents
              </Button>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* ======================= */}
      {/* Mobile Backdrop Overlay */}
      {/* ======================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* ======================= */}
      {/* Mobile Off-Canvas Drawer */}
      {/* ======================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-[280px] sm:max-w-xs bg-background border-r border-border shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-muted-foreground transition hover:bg-muted focus:outline-none"
              aria-label="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <NewChatButton />
          </div>

          {/* Recent Chat Session List */}
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            <div className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Chats
            </div>
            <SessionList onSelectSession={onClose} />
          </div>

          {/* Bottom Action */}
          <div className="border-t border-border p-4">
            <NavLink to={ROUTES.upload} onClick={onClose}>
              <Button variant="secondary" className="w-full">
                Manage Documents
              </Button>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}