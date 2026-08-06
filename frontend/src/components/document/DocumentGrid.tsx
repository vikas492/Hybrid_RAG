import { DocumentCard } from "@/components/document/DocumentCard";
import type { DocumentItem } from "@/types/document";

export function DocumentGrid({ documents, onDelete, isDeleting }: { documents: DocumentItem[]; onDelete: (id: number) => void; isDeleting?: boolean }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{documents.map((document) => <DocumentCard key={document.id} document={document} onDelete={onDelete} isDeleting={isDeleting} />)}</div>;
}
