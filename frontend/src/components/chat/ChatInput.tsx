import React, { useState } from "react";
import { Send } from "lucide-react";

export interface ChatInputProps {
  onSend?: (message: string) => void;
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function ChatInput({
  onSend,
  onSendMessage,
  disabled,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const isDisabled = Boolean(disabled || isLoading);
  const handleSend = onSend || onSendMessage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isDisabled) return;

    if (handleSend) {
      handleSend(input);
    }
    setInput("");
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background/95 p-3 sm:p-4 border-t border-border backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 max-w-4xl mx-auto w-full"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isDisabled}
            placeholder="Ask across your uploaded documents..."
            className="w-full h-11 sm:h-12 pl-4 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs sm:text-sm shadow-xs disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isDisabled}
          className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send Message"
        >
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </form>
    </div>
  );
}