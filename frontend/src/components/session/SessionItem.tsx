import { Check, MessageSquare, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn, formatDate } from "@/lib/utils";
import type { ChatSession } from "@/types/session";

interface SessionItemProps {
  session: ChatSession;
  active?: boolean;
  isDeleting?: boolean;
  isRenaming?: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}

export function SessionItem({
  session,
  active,
  isDeleting,
  isRenaming,
  onSelect,
  onRename,
  onDelete,
}: SessionItemProps) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [title, setTitle] = useState(session.title || `Chat ${session.id}`);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const displayTitle = session.title || `Chat ${session.id}`;
  const trimmedTitle = title.trim();

  const handleSelect = () => {
    onSelect();
    navigate("/chat");
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg text-sm transition hover:bg-muted",
        active && "bg-muted text-foreground"
      )}
    >
      <button
        className="flex w-full items-center gap-2 px-2 py-2 text-left"
        onClick={handleSelect}
      >
        <MessageSquare className="h-4 w-4 shrink-0 text-primary" />

        <span className="min-w-0 flex-1">
          {renaming ? (
            <span
              className="flex items-center gap-1"
              onClick={(event) => event.stopPropagation()}
            >
              <input
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && trimmedTitle) {
                    onRename(trimmedTitle);
                    setRenaming(false);
                    setMenuOpen(false);
                  }

                  if (event.key === "Escape") {
                    setTitle(displayTitle);
                    setRenaming(false);
                  }
                }}
                className="h-8 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-primary"
              />

              <button
                className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                disabled={!trimmedTitle || isRenaming}
                onClick={() => {
                  onRename(trimmedTitle);
                  setRenaming(false);
                  setMenuOpen(false);
                }}
              >
                <Check className="h-4 w-4" />
              </button>

              <button
                className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                onClick={() => {
                  setTitle(displayTitle);
                  setRenaming(false);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ) : (
            <>
              <span className="block truncate font-medium">
                {displayTitle}
              </span>

              <span className="block truncate text-xs text-muted-foreground">
                {formatDate(session.created_at)}
              </span>
            </>
          )}
        </span>
      </button>

      {!renaming && (
        <div ref={menuRef} className="absolute right-1 top-1.5">
          <button
            className="rounded-md p-1.5 text-muted-foreground opacity-100 transition hover:bg-background hover:text-foreground lg:opacity-0 lg:group-hover:opacity-100"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((open) => !open);
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-border bg-card p-1 shadow-soft">
              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  setTitle(displayTitle);
                  setRenaming(true);
                  setMenuOpen(false);
                }}
              >
                <Pencil className="h-4 w-4" />
                Rename
              </button>

              <button
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setConfirmingDelete(true);
                  setMenuOpen(false);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {confirmingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-semibold">Delete Chat?</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                onClick={() => setConfirmingDelete(false)}
              >
                Cancel
              </button>

              <button
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white hover:bg-destructive/90"
                disabled={isDeleting}
                onClick={() => {
                  onDelete();
                  setConfirmingDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}