export interface Source {
  filename: string;
  chunk_id: number;
  passage: string;
}

export interface ChatRequest {
  session_id: number;
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  sources?: Source[];
  createdAt: string;
}

export interface PersistedChatMessage {
  id: number;
  role: ChatRole | string;
  content: string;
  created_at: string;
}
