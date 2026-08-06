export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const ROUTES = {
  dashboard: "/",
  chat: "/chat",
  upload: "/upload",
} as const;
