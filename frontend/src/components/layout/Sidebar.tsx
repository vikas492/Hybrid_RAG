import { MessagesSquare } from "lucide-react";
import { NewChatButton } from "@/components/session/NewChatButton";
import { SessionList } from "@/components/session/SessionList";

export function Sidebar() {
  return <aside className="hidden w-80 shrink-0 border-r border-border bg-card/70 p-4 lg:flex lg:flex-col"><NewChatButton /><div className="mt-6 min-h-0 flex-1 overflow-y-auto"><div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><MessagesSquare className="h-4 w-4" />Chats</div><SessionList /></div></aside>;
}
