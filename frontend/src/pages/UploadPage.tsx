// import { Search } from "lucide-react";
// import { EmptyState } from "@/components/common/EmptyState";
// import { ErrorState } from "@/components/common/ErrorState";
// import { Loader } from "@/components/common/Loader";
// import { DocumentGrid } from "@/components/document/DocumentGrid";
// import { UploadDropzone } from "@/components/document/UploadDropzone";
// import { Header } from "@/components/layout/Header";
// import { useDeleteDocument, useDocuments } from "@/hooks/useDocuments";
// import { useDocumentStore } from "@/store/document.store";
// import { getErrorMessage } from "@/lib/utils";

// export function UploadPage() {
//   const { data = [], isLoading, error } = useDocuments();
//   const deleteDocument = useDeleteDocument();
//   const search = useDocumentStore((state) => state.search);
//   const setSearch = useDocumentStore((state) => state.setSearch);
//   const filtered = data.filter((document) => document.filename.toLowerCase().includes(search.toLowerCase()));
//   return <div><Header title="Documents" description="Upload, search, and manage the PDFs used by hybrid retrieval." /><div className="grid gap-6 lg:grid-cols-[280px_1fr]"><UploadDropzone /><section><div className="mb-4 flex flex-col gap-2 rounded-xl border border-border bg-card px-3 py-3 sm:flex-row sm:items-center"><div className="flex items-center gap-2"><Search className="h-4 w-4 text-muted-foreground" /><span className="sr-only">Search documents</span></div><input value={search} onChange={(event) => setSearch(event.target.value)} className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search documents" /></div>{isLoading ? <Loader label="Loading documents" /> : error ? <ErrorState message={getErrorMessage(error)} /> : filtered.length ? <DocumentGrid documents={filtered} onDelete={deleteDocument.mutate} isDeleting={deleteDocument.isPending} /> : <EmptyState title="No documents found" description="Upload a PDF or adjust your search." />}</section></div></div>;
// }
import { Search } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Loader } from "@/components/common/Loader";
import { DocumentGrid } from "@/components/document/DocumentGrid";
import { UploadDropzone } from "@/components/document/UploadDropzone";
import { Header } from "@/components/layout/Header";
import { useDeleteDocument, useDocuments } from "@/hooks/useDocuments";
import { useDocumentStore } from "@/store/document.store";
import { getErrorMessage } from "@/lib/utils";

export function UploadPage() {
  const { data = [], isLoading, error } = useDocuments();
  const deleteDocument = useDeleteDocument();
  const search = useDocumentStore((state) => state.search);
  const setSearch = useDocumentStore((state) => state.setSearch);
  const filtered = data.filter((document) =>
    document.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-6 min-h-0">
      <Header
        title="Documents"
        description="Upload, search, and manage the PDFs used by hybrid retrieval."
      />
      
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <UploadDropzone />
        <section>
          <div className="mb-4 flex flex-col gap-2 rounded-xl border border-border bg-card px-3 py-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Search documents</span>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Search documents"
            />
          </div>
          {isLoading ? (
            <Loader label="Loading documents" />
          ) : error ? (
            <ErrorState message={getErrorMessage(error)} />
          ) : filtered.length ? (
            <DocumentGrid
              documents={filtered}
              onDelete={deleteDocument.mutate}
              isDeleting={deleteDocument.isPending}
            />
          ) : (
            <EmptyState
              title="No documents found"
              description="Upload a PDF or adjust your search."
            />
          )}
        </section>
      </div>
    </div>
  );
}