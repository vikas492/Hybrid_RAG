import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sessionService } from "@/services/session.service";
import { useChatStore } from "@/store/chat.store";
import { useSessionStore } from "@/store/session.store";
import { getErrorMessage } from "@/lib/utils";
import type { ChatMessage, ChatRole } from "@/types/chat";
import type { ChatSession } from "@/types/session";

const sessionsKey = ["sessions"] as const;

function isChatRole(role: string): role is ChatRole {
  return role === "user" || role === "assistant";
}

function toChatMessages(session: ChatSession): ChatMessage[] {
  return (session.messages ?? [])
    .filter((message) => isChatRole(message.role))
    .map((message) => {
      const role = message.role as ChatRole;
      return {
        id: String(message.id),
        role,
        content: message.content,
        createdAt: message.created_at,
      };
    });
}

export function useSessions() {
  return useQuery({ queryKey: sessionsKey, queryFn: sessionService.list });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const setActiveSessionId = useSessionStore((state) => state.setActiveSessionId);
  return useMutation({
    mutationFn: sessionService.create,
    onSuccess: (data) => {
      setActiveSessionId(data.session_id);
      void queryClient.invalidateQueries({ queryKey: sessionsKey });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useSelectSession() {
  const setActiveSessionId = useSessionStore((state) => state.setActiveSessionId);
  const setMessages = useChatStore((state) => state.setMessages);
  return (session: ChatSession) => {
    if (session.messages) {
      setMessages(session.id, toChatMessages(session));
    }
    setActiveSessionId(session.id);
  };
}

export function useRenameSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => sessionService.rename(id, { title }),
    onSuccess: (updatedSession) => {
      queryClient.setQueryData<ChatSession[]>(sessionsKey, (sessions) =>
        sessions?.map((session) => (session.id === updatedSession.id ? { ...session, title: updatedSession.title } : session)),
      );
      toast.success("Chat renamed");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  const activeSessionId = useSessionStore((state) => state.activeSessionId);
  const setActiveSessionId = useSessionStore((state) => state.setActiveSessionId);
  const clearSession = useChatStore((state) => state.clearSession);
  return useMutation({
    mutationFn: sessionService.delete,
    onSuccess: (_response, deletedId) => {
      clearSession(deletedId);
      queryClient.setQueryData<ChatSession[]>(sessionsKey, (sessions) => {
        const nextSessions = sessions?.filter((session) => session.id !== deletedId) ?? [];
        if (activeSessionId === deletedId) {
          setActiveSessionId(nextSessions[0]?.id ?? null);
        }
        return nextSessions;
      });
      void queryClient.invalidateQueries({ queryKey: sessionsKey });
      toast.success("Chat deleted");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
