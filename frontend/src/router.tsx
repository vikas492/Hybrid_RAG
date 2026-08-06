import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatPage } from "@/pages/ChatPage";
import { Dashboard } from "@/pages/Dashboard";
import { NotFound } from "@/pages/NotFound";
import { UploadPage } from "@/pages/UploadPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "chat", element: <ChatPage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "documents", element: <Navigate to="/upload" replace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
