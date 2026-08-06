import { createSession, deleteSession, getSessionMessages, getSessions, renameSession } from "@/api/session.api";

export const sessionService = { create: createSession, list: getSessions, rename: renameSession, delete: deleteSession, getMessages: getSessionMessages };
