import { Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export function DeleteDialog({ filename, isDeleting, onConfirm }: { filename: string; isDeleting?: boolean; onConfirm: () => void }) {
  return <Button variant="danger" disabled={isDeleting} onClick={() => { if (window.confirm(`Delete ${filename}?`)) onConfirm(); }} aria-label={`Delete ${filename}`}><Trash2 className="h-4 w-4" /></Button>;
}
