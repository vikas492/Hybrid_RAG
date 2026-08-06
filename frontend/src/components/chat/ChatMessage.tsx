import { motion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { MessageBubble } from "@/components/chat/MessageBubble";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}><MessageBubble message={message} /></motion.div>;
}
