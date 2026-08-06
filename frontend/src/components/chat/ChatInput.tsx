import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/common/Button";

const schema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Ask a question first."),
});

type FormValues = z.infer<typeof schema>;

export function ChatInput({
  disabled,
  onSend,
}: {
  disabled?: boolean;
  onSend: (question: string) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ question }) => {
        onSend(question);
        reset();
      })}
      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5"
    >
      <input
        {...register("question")}
        disabled={disabled}
        placeholder="Ask anything about your documents..."
        className="
          min-h-[52px]
          flex-1
          rounded-2xl
          border
          border-border
          bg-card
          px-5
          text-base
          shadow-sm
          outline-none
          transition-all
          placeholder:text-muted-foreground
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />

      <Button
        type="submit"
        disabled={disabled || formState.isSubmitting}
        className="h-[56px] w-[56px] rounded-3xl p-0 shadow-md"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}