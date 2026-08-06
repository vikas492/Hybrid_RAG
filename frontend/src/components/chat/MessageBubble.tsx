import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { SourcesPanel } from "@/components/chat/SourcesPanel";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}><div className={cn("max-w-[86%] rounded-2xl px-4 py-3 shadow-sm", isUser ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground")}><div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2"><ReactMarkdown>{message.content}</ReactMarkdown></div>{!isUser && message.sources ? <SourcesPanel sources={message.sources} /> : null}</div></div>;
}
