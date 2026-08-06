import { apiClient } from "@/api/axios";
import type { ChatRequest, ChatResponse } from "@/types/chat";

export async function sendChatMessage(payload: ChatRequest) {
  const { data } = await apiClient.post<ChatResponse>("/chat", payload);
  return data;
}
