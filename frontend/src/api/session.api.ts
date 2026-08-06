import { apiClient } from "@/api/axios";
import type { ChatSession, CreateSessionResponse, DeleteSessionResponse, RenameSessionRequest, RenameSessionResponse } from "@/types/session";

export async function createSession() {
  const { data } = await apiClient.post<CreateSessionResponse>("/sessions");
  return data;
}

export async function getSessions() {
  const { data } = await apiClient.get<ChatSession[]>("/sessions");
  return data;
}

export async function renameSession(id: number, payload: RenameSessionRequest) {
  const { data } = await apiClient.patch<RenameSessionResponse>(`/sessions/${id}`, payload);
  return data;
}

export async function deleteSession(id: number) {
  const { data } = await apiClient.delete<DeleteSessionResponse>(`/sessions/${id}`);
  return data;
}
export async function getSessionMessages(id: number) {
    const { data } = await apiClient.get(`/sessions/${id}/messages`);
    return data;
}