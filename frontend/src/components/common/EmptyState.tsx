import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/70 p-8 text-center"><h3 className="font-semibold">{title}</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>{action ? <div className="mt-4">{action}</div> : null}</div>;
}
