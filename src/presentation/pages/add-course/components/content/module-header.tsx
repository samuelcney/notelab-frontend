"use client";

import type { Module } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface ModuleHeaderProps {
  module: Module;
  onModuleRemoved: () => void;
}

export function ModuleHeader({ module, onModuleRemoved }: ModuleHeaderProps) {
  const { updateModuleName, addLesson, removeModule } = useCourseStore();

  return (
    <div className="flex items-center justify-between max-sm:flex-col  max-sm:gap-2">
      <div className="flex-1 mr-4">
        <Input
          value={module.title}
          onChange={(e) => updateModuleName(module.id, e.target.value)}
          placeholder="Nome do módulo"
          className="font-medium text-lg max-sm:w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addLesson(module.id)}
          className="text-foreground border-border border"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Aula
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            removeModule(module.id);
            onModuleRemoved();
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover Módulo
        </Button>
      </div>
    </div>
  );
}
