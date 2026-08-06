import { apiClient } from "@/api/axios";
import type { DocumentItem } from "@/types/document";

export async function getDocuments() {
  const { data } = await apiClient.get<DocumentItem[]>("/api/v1/documents");
  return data;
}

export async function uploadDocument(file: File, onProgress?: (progress: number) => void) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await apiClient.post<DocumentItem>("/api/v1/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!event.total) return;
      onProgress?.(Math.round((event.loaded * 100) / event.total));
    },
  });
  return data;
}

export async function deleteDocument(id: number) {
  await apiClient.delete(`/api/v1/documents/${id}`);
}
