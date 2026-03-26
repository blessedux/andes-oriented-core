import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return <div aria-hidden className={cn("bg-border h-px w-full", className)} />;
}
