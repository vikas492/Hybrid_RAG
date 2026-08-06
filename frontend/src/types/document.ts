export type DocumentStatus = "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED" | string;

export interface DocumentItem {
  id: number;
  filename: string;
  stored_filename: string;
  file_path: string;
  content_type: string;
  file_size: number;
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
}
