import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";

export function NotFound() {
  const navigate = useNavigate();
  return <div className="flex min-h-[60vh] flex-col items-center justify-center text-center"><h1 className="text-4xl font-semibold">404</h1><p className="mt-2 text-muted-foreground">This page does not exist.</p><Button className="mt-5" onClick={() => navigate("/")}>Go home</Button></div>;
}
