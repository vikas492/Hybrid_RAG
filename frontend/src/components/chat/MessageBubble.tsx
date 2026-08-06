import ReactMarkdown from "react-markdown";

import { SourcesPanel } from "@/components/chat/SourcesPanel";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function MessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "w-full max-w-full rounded-[28px] px-5 py-4 shadow-sm transition-all duration-200",

          "sm:max-w-[92%] lg:max-w-[82%]",

          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card"
        )}
      >
        {!isUser && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              AI
            </div>

            <div>
              <p className="text-sm font-semibold">
                Hybrid RAG
              </p>

              <p className="text-xs text-muted-foreground">
                AI Assistant
              </p>
            </div>
          </div>
        )}

        <div
          className="prose prose-neutral dark:prose-invert max-w-none text-base leading-7 prose-p:my-3 prose-li:my-2 break-words overflow-x-auto"
        >
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-6">
              <SourcesPanel
                sources={message.sources}
              />
            </div>
          )}
      </div>
    </div>
  );
}