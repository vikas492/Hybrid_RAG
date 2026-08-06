import type { PersistedChatMessage } from "@/types/chat";

export interface ChatSession {
  id: number;
  title: string;
  created_at: string;
  messages?: PersistedChatMessage[];
}

export interface CreateSessionResponse {
  session_id: number;
}

export interface RenameSessionRequest {
  title: string;
}

export interface RenameSessionResponse {
  id: number;
  title: string;
}

export interface DeleteSessionResponse {
  message: string;
}
