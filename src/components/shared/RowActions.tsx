import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RowActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
