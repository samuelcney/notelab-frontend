"use client";

import { Button } from "@/presentation/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/ui/dialog";
import { Input } from "@/presentation/ui/input";
import { Textarea } from "@/presentation/ui/textarea";
import { useEffect, useState } from "react";

type LessonType = "VIDEO" | "PDF" | "TEXT";

interface LessonContentModalProps {
  lessonId: string;
  moduleId: string;
  type: LessonType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: File | string) => void;
  defaultValue?: File | string | null;
}

export function LessonContentModal({
  lessonId,
  moduleId,
  type,
  isOpen,
  onClose,
  onSave,
  defaultValue = null,
}: LessonContentModalProps) {
  const [content, setContent] = useState<File | string | null>(defaultValue);

  useEffect(() => {
    setContent(defaultValue ?? null);
  }, [defaultValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setContent(file);
  };

  const handleSave = () => {
    if (!content) return;
    onSave(content);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar Conteúdo da Aula</DialogTitle>
        </DialogHeader>

        {type === "TEXT" && (
          <Textarea
            rows={10}
            placeholder="Digite o conteúdo da aula..."
            value={typeof content === "string" ? content : ""}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {(type === "VIDEO" || type === "PDF") && (
          <div className="space-y-2">
            <Input
              type="file"
              accept={type === "VIDEO" ? "video/*" : "application/pdf"}
              onChange={handleFileChange}
            />
            {content instanceof File && (
              <p className="text-sm text-muted-foreground">
                Arquivo selecionado: {content.name}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!content}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
