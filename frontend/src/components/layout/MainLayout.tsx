import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function MainLayout() {
  return <div className="min-h-screen bg-background text-foreground"><Navbar /><div className="mx-auto flex h-[calc(100vh-4rem)] max-w-screen-2xl"><Sidebar /><main className="min-w-0 flex-1 overflow-auto p-4 md:p-6"><Outlet /></main></div></div>;
}
