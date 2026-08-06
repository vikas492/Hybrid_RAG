import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"><AlertTriangle className="mb-2 h-5 w-5" />{message}</div>;
}
