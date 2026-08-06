import { useRef, useState, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { useUploadDocument } from "@/hooks/useDocuments";
import { UploadButton } from "@/components/document/UploadButton";

export function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const upload = useUploadDocument();
  const selectFile = (next: File | undefined) => next && next.type === "application/pdf" && setFile(next);
  const onDrop = (event: DragEvent<HTMLLabelElement>) => { event.preventDefault(); selectFile(event.dataTransfer.files[0]); };
  return <form className="w-full rounded-xl border border-border bg-card p-5 shadow-soft" onSubmit={(event) => { event.preventDefault(); if (file) upload.mutate({ file, onProgress: setProgress }, { onSuccess: () => { setFile(null); setProgress(0); if (inputRef.current) inputRef.current.value = ""; } }); }}><label onDragOver={(event) => event.preventDefault()} onDrop={onDrop} className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background p-8 text-center transition hover:border-primary"><UploadCloud className="h-9 w-9 text-primary" /><span className="mt-3 break-words text-sm font-medium">{file ? file.name : "Drop a PDF here or browse"}</span><span className="mt-1 text-sm text-muted-foreground">PDF files are uploaded directly to your RAG pipeline.</span><input ref={inputRef} type="file" accept="application/pdf" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} /></label>{upload.isPending ? <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div> : null}<div className="mt-4 flex justify-end"><UploadButton disabled={!file || upload.isPending} /></div></form>;
}
