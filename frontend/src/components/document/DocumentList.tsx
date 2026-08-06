import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import type { DocumentItem } from "@/types/document";

export function DocumentList({ documents }: { documents: DocumentItem[] }) {
  return <div className="space-y-2">{documents.slice(0, 8).map((document) => <Link key={document.id} to="/upload" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><FileText className="h-4 w-4 text-primary" /><span className="truncate">{document.filename}</span></Link>)}</div>;
}
