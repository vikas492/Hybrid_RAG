import { Upload } from "lucide-react";
import { Button } from "@/components/common/Button";

export function UploadButton({ disabled }: { disabled?: boolean }) {
  return <Button type="submit" disabled={disabled}><Upload className="h-4 w-4" />Upload PDF</Button>;
}
