"use client";
import type { Lesson } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { lessonTypeEnum } from "@/utils/Enums";
import { Trash2 } from "lucide-react";
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
  onToggleExpand,
}: LessonItemProps) {
  const { updateLesson, removeLesson } = useCourseStore();

  return (
    <div className="border rounded-md overflow-hidden border-border">
      <div
        className="flex items-center justify-between p-3 bg-green-700 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="font-medium ml-3 text-white">{lesson.title}</div>
          <div className="text-xs px-2 py-0.5 rounded-full bg-muted">
            {lesson.type === lessonTypeEnum.VIDEO_URL && "URL de Vídeo"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:bg-white rounded-full"
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
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
