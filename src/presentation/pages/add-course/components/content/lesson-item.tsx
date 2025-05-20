"use client";
import type { Lesson } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { lessonTypeEnum } from "@/utils/Enums";
import { Clock, Trash2 } from "lucide-react";
import { LessonContent } from "./lesson-content";
import { LessonTypeSelector } from "./lesson-type-selector";

interface LessonItemProps {
  lesson: Lesson;
  moduleId: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function LessonItem({
  lesson,
  moduleId,
  isExpanded,
  onToggleExpand,
}: LessonItemProps) {
  const { updateLesson, removeLesson } = useCourseStore();

  return (
    <div className="border rounded-md overflow-hidden border-foreground">
      <div
        className="flex items-center justify-between p-3 bg-gray-500 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="font-medium ml-3">{lesson.title}</div>
          <div className="text-xs px-2 py-0.5 rounded-full bg-muted">
            {lesson.type === lessonTypeEnum.VIDEO_URL && "URL de Vídeo"}
            {lesson.type === lessonTypeEnum.VIDEO && "Vídeo"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-foreground text-lg">
            <Clock className="h-3 w-3 mr-1" />
            <Input
              type="number"
              value={lesson.duration ?? 0}
              onChange={(e) => {
                const raw = e.target.value;
                const parsed = raw === "" ? 0 : Number(raw);
                updateLesson(moduleId, lesson.id, "duration", parsed);
              }}
              min={0}
              max={300}
              placeholder="00"
              className="w-16 h-6 text-xs"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              removeLesson(moduleId, lesson.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remover aula</span>
          </Button>
        </div>
      </div>

      <div className="p-3 border-t">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">
                Título da Aula
              </label>
              <Input
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(moduleId, lesson.id, "title", e.target.value)
                }
                placeholder="Título da aula"
                className="mt-1"
              />
            </div>
            <LessonTypeSelector
              value={lesson.type}
              onChange={(value) =>
                updateLesson(moduleId, lesson.id, "type", value)
              }
            />
          </div>

          <LessonContent lesson={lesson} moduleId={moduleId} />
        </div>
      </div>
    </div>
  );
}
