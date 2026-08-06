import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <div className="mt-4 border-t border-border pt-4">

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-2 transition hover:bg-muted/40"
      >
        <div className="text-sm font-semibold">
          📚 Sources ({sources.length})
        </div>

        <motion.div
          animate={{
            rotate: expanded ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid gap-3 md:grid-cols-2">
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

    </div>
  );
}