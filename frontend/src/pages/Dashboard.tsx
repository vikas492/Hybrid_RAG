// import { Link } from "react-router-dom";
// import { Activity, FileText, MessagesSquare } from "lucide-react";
// import { EmptyState } from "@/components/common/EmptyState";
// import { Header } from "@/components/layout/Header";
// import { useDocuments } from "@/hooks/useDocuments";
// import { useSessions } from "@/hooks/useSessions";
// import { formatDate } from "@/lib/utils";


// export function Dashboard() {
//   const { data: documents = [] } = useDocuments();
//   const { data: sessions = [] } = useSessions();
//   const stats = [{ label: "Total Documents", value: documents.length, icon: FileText }, { label: "Total Chats", value: sessions.length, icon: MessagesSquare }, { label: "System Status", value: "Ready", icon: Activity }];
//   return <div><Header title="Dashboard" description="Monitor your Hybrid RAG workspace and jump into recent knowledge." /><div className="grid gap-4 md:grid-cols-3">{stats.map((stat) => <article key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-sm"><stat.icon className="h-5 w-5 text-primary" /><p className="mt-4 text-sm text-muted-foreground">{stat.label}</p><p className="mt-1 text-2xl font-semibold">{stat.value}</p></article>)}</div><section className="mt-6 rounded-xl border border-border bg-card p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Recent Documents</h2><Link to="/upload" className="text-sm font-medium text-primary">Manage</Link></div>{documents.length ? <div className="divide-y divide-border">{documents.slice(0, 6).map((document) => <div key={document.id} className="flex items-center justify-between gap-4 py-3 text-sm"><span className="truncate font-medium">{document.filename}</span><span className="shrink-0 text-muted-foreground">{formatDate(document.created_at)}</span></div>)}</div> : <EmptyState title="No documents yet" description="Upload PDFs to start retrieval-augmented conversations." />}</section></div>;
// }
import { Link } from "react-router-dom";
import { Activity, FileText, MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { Header } from "@/components/layout/Header";
import { useDocuments } from "@/hooks/useDocuments";
import { useSessions } from "@/hooks/useSessions";
import { formatDate } from "@/lib/utils";

export function Dashboard() {
  const { data: documents = [] } = useDocuments();
  const { data: sessions = [] } = useSessions();
  const stats = [
    { label: "Total Documents", value: documents.length, icon: FileText },
    { label: "Total Chats", value: sessions.length, icon: MessagesSquare },
    { label: "System Status", value: "Ready", icon: Activity },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-6 min-h-0">
      <Header
        title="Dashboard"
        description="Monitor your Hybrid RAG workspace and jump into recent knowledge."
      />
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <stat.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent Documents</h2>
          <Link to="/upload" className="text-sm font-medium text-primary">
            Manage
          </Link>
        </div>
        {documents.length ? (
          <div className="divide-y divide-border">
            {documents.slice(0, 6).map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <span className="truncate font-medium">
                  {document.filename}
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {formatDate(document.created_at)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No documents yet"
            description="Upload PDFs to start retrieval-augmented conversations."
          />
        )}
      </section>
    </div>
  );
}