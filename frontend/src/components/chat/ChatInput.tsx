import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
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
            placeholder="Ask across your uploaded documents..."
            className="w-full h-12 pl-4 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm sm:text-base shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send Message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}