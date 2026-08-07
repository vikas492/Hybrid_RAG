import { useEffect } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useSessionStore } from "@/store/session.store";

export function ChatPage() {
  const activeSessionId = useSessionStore((state) => state.activeSessionId);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1">
        <ChatWindow sessionId={activeSessionId} />
      </div>
    </div>
  );
}