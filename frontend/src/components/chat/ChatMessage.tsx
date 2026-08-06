import { motion } from "framer-motion";

import { MessageBubble } from "@/components/chat/MessageBubble";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

export function ChatMessage({
  message,
}: {
  message: ChatMessageType;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="w-full"
    >
      <MessageBubble message={message} />
    </motion.div>
  );
}