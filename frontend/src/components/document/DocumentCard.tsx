import { FileText } from "lucide-react";
import { DeleteDialog } from "@/components/document/DeleteDialog";
import { formatBytes, formatDate } from "@/lib/utils";
import type { DocumentItem } from "@/types/document";

export function DocumentCard({ document, onDelete, isDeleting }: { document: DocumentItem; onDelete: (id: number) => void; isDeleting?: boolean }) {
  return <article className="rounded-xl border border-border bg-card p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><FileText className="mb-3 h-5 w-5 text-primary" /><h3 className="truncate font-semibold">{document.filename}</h3><p className="mt-1 text-sm text-muted-foreground">{formatBytes(document.file_size)} · {document.status}</p><p className="mt-2 text-xs text-muted-foreground">{formatDate(document.created_at)}</p></div><DeleteDialog filename={document.filename} isDeleting={isDeleting} onConfirm={() => onDelete(document.id)} /></div></article>;
}
