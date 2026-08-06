import { deleteDocument, getDocuments, uploadDocument } from "@/api/document.api";

export const documentService = { list: getDocuments, upload: uploadDocument, delete: deleteDocument };
