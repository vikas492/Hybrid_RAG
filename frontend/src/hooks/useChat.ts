import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { chatService } from "@/services/chat.service";
import { sessionService } from "@/services/session.service";
import { useChatStore } from "@/store/chat.store";
import { getErrorMessage } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

const EMPTY_MESSAGES: ChatMessage[] = [];

export function useChat(sessionId: number | null) {
  const messagesBySession = useChatStore(
    (state) => state.messagesBySession
  );

  const addMessage = useChatStore(
    (state) => state.addMessage
  );

  const setMessages = useChatStore(
    (state) => state.setMessages
  );

  const messages =
    sessionId === null
      ? EMPTY_MESSAGES
      : messagesBySession[sessionId] ?? EMPTY_MESSAGES;

  // ------------------------------------------
  // Load chat history
  // ------------------------------------------

  useEffect(() => {
    if (sessionId === null) return;

    const id = sessionId;

    // Already loaded
    if (messagesBySession[id]) return;

    const loadMessages = async () => {
      try {
        const data = await sessionService.getMessages(id);

        setMessages(id, data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    void loadMessages();
  }, [sessionId, messagesBySession, setMessages]);

  // ------------------------------------------
  // Send Message
  // ------------------------------------------

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      if (sessionId === null) {
        throw new Error("Create or select a chat session first.");
      }

      const id = sessionId;

      addMessage(id, {
        id: crypto.randomUUID(),
        role: "user",
        content: question,
        createdAt: new Date().toISOString(),
      });

      return chatService.send({
        session_id: id,
        question,
      });
    },

    onSuccess: (response) => {
      if (sessionId === null) return;

      const id = sessionId;

      addMessage(id, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        createdAt: new Date().toISOString(),
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return {
    messages,
    sendMessage: mutation.mutate,
    isSending: mutation.isPending,
  };
}