import { create } from "zustand";
import type { ChatMessage } from "@/types/chat";

interface ChatState {
  messagesBySession: Record<number, ChatMessage[]>;
  addMessage: (sessionId: number, message: ChatMessage) => void;
  setMessages: (sessionId: number, messages: ChatMessage[]) => void;
  clearSession: (sessionId: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messagesBySession: {},
  addMessage: (sessionId, message) =>
    set((state) => ({ messagesBySession: { ...state.messagesBySession, [sessionId]: [...(state.messagesBySession[sessionId] ?? []), message] } })),
  setMessages: (sessionId, messages) =>
    set((state) => ({ messagesBySession: { ...state.messagesBySession, [sessionId]: messages } })),
  clearSession: (sessionId) =>
    set((state) => {
      const next = { ...state.messagesBySession };
      delete next[sessionId];
      return { messagesBySession: next };
    }),
}));
