import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", ...props }, ref) => {
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border border-border bg-card text-foreground hover:bg-muted",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    danger: "bg-destructive text-white hover:bg-destructive/90",
  };
  return <button ref={ref} className={cn("inline-flex h-12 min-h-[3rem] items-center justify-center gap-2 rounded-lg px-4 text-base font-medium transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-sm sm:px-4", variants[variant], className)} {...props} />;
});
Button.displayName = "Button";
