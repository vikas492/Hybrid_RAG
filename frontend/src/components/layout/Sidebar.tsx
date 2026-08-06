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

export function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* ===================== */}
      {/* Desktop Sidebar */}
      {/* ===================== */}

      <aside className="hidden lg:flex lg:w-[300px] shrink-0 flex-col border-r border-border bg-card/70 backdrop-blur">

        <div className="border-b border-border p-5">
          <NewChatButton />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">

          <div className="px-5 pt-5">
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
              <Button
                variant="secondary"
                className="w-full"
              >
                Manage Documents
              </Button>
            </NavLink>
          </div>

        </div>

      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-80 max-w-[85vw] bg-background border-r border-border shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-lg font-semibold">
                Hybrid RAG
              </h2>
              <p className="text-sm text-muted-foreground">
                AI Assistant
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-2xl p-2 text-muted-foreground transition hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <NewChatButton />
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Chats
            </div>
            <SessionList onSelectSession={onClose} />
          </div>

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