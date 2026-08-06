export function TypingIndicator() {
  return <div className="flex justify-start"><div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3">{[0, 1, 2].map((index) => <span key={index} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${index * 120}ms` }} />)}</div></div>;
}
