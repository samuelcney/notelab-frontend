"use client";

import { Button } from "@/presentation/ui/button";
import { FileText, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddModule: () => void;
}

export function EmptyState({ onAddModule }: EmptyStateProps) {
  return (
    <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border">
      <div className="flex flex-col items-center gap-2 text-center">
        <FileText className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Nenhum módulo adicionado. Clique em &quot;Adicionar Módulo&quot; para
          começar.
        </p>
        <Button onClick={onAddModule}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Módulo
        </Button>
      </div>
    </div>
  );
}
