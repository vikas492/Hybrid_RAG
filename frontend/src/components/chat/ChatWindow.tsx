import { useEffect, useRef } from "react";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { EmptyState } from "@/components/common/EmptyState";
import { useChat } from "@/hooks/useChat";

export function ChatWindow({
  sessionId,
}: {
  sessionId: number | null;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, isSending } = useChat(sessionId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  return (
    <section className="flex h-full w-full flex-col min-h-0 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:p-5 shadow-sm">
      {/* Header Inside Chat Window */}
      <div className="mb-2 sm:mb-4 px-1 space-y-0.5 shrink-0">
        <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
          Ask Your Knowledge Base
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Answers are generated from your uploaded PDFs with source passage attached.
        </p>
      </div>

      {/* Scrollable Messages Container */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 py-2">
          {messages.length === 0 ? (
            <EmptyState
              title={
                sessionId
                  ? "Start the conversation"
                  : "Create a chat session"
              }
              description={
                sessionId
                  ? "Ask questions about your uploaded documents."
                  : "Create a new chat to begin."
              }
            />
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {isSending && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed Bottom Input Bar */}
      <div className="mt-2 pt-2 border-t border-slate-200/80 shrink-0">
        <div className="mx-auto w-full max-w-4xl">
          <ChatInput
            disabled={!sessionId || isSending}
            onSend={sendMessage}
          />
        </div>
      </div>
    </section>
  );
}