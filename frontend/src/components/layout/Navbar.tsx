import { NavLink } from "react-router-dom";
import { DatabaseZap, LayoutDashboard, MessageSquare, Upload } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) => cn("inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground", isActive && "bg-muted text-foreground");
  return <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur"><div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4"><NavLink to={ROUTES.dashboard} className="flex items-center gap-2 font-semibold"><DatabaseZap className="h-5 w-5 text-primary" />Hybrid RAG</NavLink><nav className="flex items-center gap-1"><NavLink to={ROUTES.dashboard} className={linkClass}><LayoutDashboard className="h-4 w-4" />Dashboard</NavLink><NavLink to={ROUTES.chat} className={linkClass}><MessageSquare className="h-4 w-4" />Chat</NavLink><NavLink to={ROUTES.upload} className={linkClass}><Upload className="h-4 w-4" />Upload</NavLink></nav></div></header>;
}
