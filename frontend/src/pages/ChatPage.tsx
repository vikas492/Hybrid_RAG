import { ChatWindow } from "@/components/chat/ChatWindow";
import { Header } from "@/components/layout/Header";
import { useSessionStore } from "@/store/session.store";

export function ChatPage() {
  const activeSessionId = useSessionStore((state) => state.activeSessionId);
  return <div className="flex h-full min-h-0 flex-col"><Header title="Ask Your Knowledge Base" description="Answers are generated from your uploaded PDFs with source passages attached." /><div className="min-h-0 flex-1"><ChatWindow sessionId={activeSessionId} /></div></div>;
}
