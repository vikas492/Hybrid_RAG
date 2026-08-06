import { Loader } from "@/components/common/Loader";
import { SessionItem } from "@/components/session/SessionItem";
import { useDeleteSession, useRenameSession, useSelectSession, useSessions } from "@/hooks/useSessions";
import { useSessionStore } from "@/store/session.store";

export function SessionList() {
  const { data, isLoading } = useSessions();
  const renameSession = useRenameSession();
  const deleteSession = useDeleteSession();
  const selectSession = useSelectSession();
  const activeSessionId = useSessionStore((state) => state.activeSessionId);
  if (isLoading) return <Loader label="Loading chats" />;
  return <div className="space-y-1">{(data ?? []).map((session) => <SessionItem key={session.id} session={session} active={session.id === activeSessionId} isDeleting={deleteSession.isPending} isRenaming={renameSession.isPending} onSelect={() => selectSession(session)} onRename={(title) => renameSession.mutate({ id: session.id, title })} onDelete={() => deleteSession.mutate(session.id)} />)}</div>;
}
