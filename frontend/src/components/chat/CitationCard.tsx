import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";

import type { Source } from "@/types/chat";

export function CitationCard({
  source,
}: {
  source: Source;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-muted/40"
      >
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-primary" />
            {source.filename}
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Chunk {source.chunk_id}
          </div>
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
              duration: 0.2,
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3 py-3">
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {source.passage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </article>
  );
}