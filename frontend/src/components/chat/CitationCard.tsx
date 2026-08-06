import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  FileText,
} from "lucide-react";

import type { Source } from "@/types/chat";

export function CitationCard({
  source,
}: {
  source: Source;
}) {
  const [expanded, setExpanded] =
    useState(false);

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition hover:shadow-md">

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-muted/10"
      >
        <div className="min-w-0 flex items-center gap-3">

          <div className="rounded-xl bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>

          <div className="min-w-0">

            <h4 className="truncate text-sm font-semibold">
              {source.filename}
            </h4>

            <p className="mt-1 text-xs text-muted-foreground">
              Chunk #{source.chunk_id}
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

            <div className="border-t border-border bg-muted/20 p-4">

              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground">
                {source.passage}
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </article>
  );
}