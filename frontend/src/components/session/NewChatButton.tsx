import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useCreateSession } from "@/hooks/useSessions";

export function NewChatButton() {
  const createSession = useCreateSession();
  return <Button className="w-full" onClick={() => createSession.mutate()} disabled={createSession.isPending}><MessageSquarePlus className="h-4 w-4" />New Chat</Button>;
}
