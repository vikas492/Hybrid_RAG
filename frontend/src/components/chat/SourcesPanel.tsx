import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

import type { Source } from "@/types/chat";
import { CitationCard } from "@/components/chat/CitationCard";

export function SourcesPanel({
  sources,
}: {
  sources: Source[];
}) {
  const [expanded, setExpanded] = useState(false);

  if (sources.length === 0) return null;

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-sm">

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-t-3xl px-5 py-4 transition hover:bg-muted/40"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="text-sm font-semibold">
              Sources
            </h3>

            <p className="text-xs text-muted-foreground">
              {sources.length} document reference{sources.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <motion.div
          animate={{
            rotate: expanded ? 180 : 0,
          }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 border-t border-border p-4 sm:grid-cols-1 md:grid-cols-2">
              {sources.map((source, index) => (
                <CitationCard
                  key={`${source.chunk_id}-${index}`}
                  source={source}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}