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

  const {
    messages,
    sendMessage,
    isSending,
  } = useChat(sessionId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages.length, isSending]);

  return (
    <section className="flex h-full min-h-0 flex-col rounded-3xl border border-border bg-background shadow-xl">

      {/* Messages */}

      <div className="flex-1 overflow-y-auto">

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-3 py-5 sm:px-5 lg:px-8">

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
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))
          )}

          {isSending && <TypingIndicator />}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* Input */}

      <div className="border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-5">
          <ChatInput
            disabled={!sessionId || isSending}
            onSend={sendMessage}
          />
        </div>
      </div>

    </section>
  );
}