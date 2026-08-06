import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/common/Button";

const schema = z.object({ question: z.string().trim().min(1, "Ask a question first.") });
type FormValues = z.infer<typeof schema>;

export function ChatInput({ disabled, onSend }: { disabled?: boolean; onSend: (question: string) => void }) {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { question: "" } });
  return <form className="flex gap-3 border-t border-border bg-background/95 p-4 backdrop-blur" onSubmit={handleSubmit(({ question }) => { onSend(question); reset(); })}><input className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary" placeholder="Ask across your uploaded documents..." disabled={disabled} {...register("question")} /><Button type="submit" disabled={disabled || formState.isSubmitting} aria-label="Send message"><Send className="h-4 w-4" /></Button></form>;
}
