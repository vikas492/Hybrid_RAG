import { useEffect, useRef } from "react";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { EmptyState } from "@/components/common/EmptyState";
import { useChat } from "@/hooks/useChat";
import { useCreateSession } from "@/hooks/useSessions";

export function ChatWindow({
  sessionId,
}: {
  sessionId: number | null;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, isSending } = useChat(sessionId);
  const createSessionMutation = useCreateSession();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  const handleSend = async (message: string) => {
    if (!sessionId) {
      createSessionMutation.mutate(undefined, {
        onSuccess: () => {
          sendMessage(message);
        },
      });
      return;
    }
    sendMessage(message);
  };

  return (
    <section className="flex flex-col h-full w-full rounded-none sm:rounded-2xl border-0 sm:border border-slate-200/80 bg-slate-50/70 p-3 sm:p-5 shadow-none sm:shadow-sm overflow-hidden">
      {/* Header */}
      <div className="mb-2 sm:mb-4 px-1 space-y-0.5 shrink-0">
        <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
          Ask Your Knowledge Base
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Answers are generated from your uploaded PDFs with source passage attached.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 py-2">
          {messages.length === 0 ? (
            <EmptyState
              title={
                sessionId
                  ? "Start the conversation"
                  : "Create or select a chat session"
              }
              description={
                sessionId
                  ? "Ask questions about your uploaded documents."
                  : "Type a message below to start a new chat."
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

      {/* Input pinned directly at the bottom */}
      <div className="mt-auto pt-2 shrink-0 pb-1 sm:pb-0">
        <div className="mx-auto w-full max-w-4xl">
          <ChatInput
            disabled={isSending || createSessionMutation.isPending}
            onSend={handleSend}
          />
        </div>
      </div>
    </section>
  );
}