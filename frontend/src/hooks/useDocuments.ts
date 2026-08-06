import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { documentService } from "@/services/document.service";
import { getErrorMessage } from "@/lib/utils";

const documentsKey = ["documents"] as const;

export function useDocuments() {
  return useQuery({ queryKey: documentsKey, queryFn: documentService.list });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) => documentService.upload(file, onProgress),
    onSuccess: () => {
      toast.success("Document uploaded");
      void queryClient.invalidateQueries({ queryKey: documentsKey });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: documentService.delete,
    onSuccess: () => {
      toast.success("Document deleted");
      void queryClient.invalidateQueries({ queryKey: documentsKey });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
