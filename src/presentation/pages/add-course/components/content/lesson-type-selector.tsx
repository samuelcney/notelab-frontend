"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/ui/select";
import { lessonTypeEnum } from "@/utils/Enums";

interface LessonTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LessonTypeSelector({
  value,
  onChange,
}: LessonTypeSelectorProps) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">
        Tipo de Conteúdo
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Selecione o tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value={lessonTypeEnum.VIDEO}
            className="hover:bg-gray-400"
          >
            Vídeo (Arquivo)
          </SelectItem>
          <SelectItem value={lessonTypeEnum.VIDEO_URL}>Vídeo (URL)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
