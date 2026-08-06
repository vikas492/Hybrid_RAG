import { useEffect, useRef } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChat } from "@/hooks/useChat";

export function ChatWindow({ sessionId }: { sessionId: number | null }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, isSending } = useChat(sessionId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  return <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-soft"><div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 md:p-6">{messages.length === 0 ? <EmptyState title={sessionId ? "Start the conversation" : "Create a chat session"} description={sessionId ? "Ask a grounded question and citations will appear under the answer." : "Use New Chat to create a session before asking questions."} /> : <div className="mx-auto max-w-4xl space-y-5">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}{isSending ? <TypingIndicator /> : null}<div ref={bottomRef} /></div>}</div><div className="shrink-0"><ChatInput disabled={!sessionId || isSending} onSend={sendMessage} /></div></section>;
}
