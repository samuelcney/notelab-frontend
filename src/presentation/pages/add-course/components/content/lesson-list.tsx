"use client";

import type { Lesson } from "@/main/stores/course-store";
import { useState } from "react";
import { LessonItem } from "./lesson-item";

interface LessonListProps {
  moduleId: string;
  lessons: Lesson[];
}

export function LessonList({ moduleId, lessons }: LessonListProps) {
  const [expandedLessons, setExpandedLessons] = useState<
    Record<string, boolean>
  >({});

  const toggleLessonExpand = (lessonId: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  if (lessons.length === 0) {
    return (
      <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">
          Nenhuma aula adicionada. Clique em "Adicionar Aula" para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          moduleId={moduleId}
          isExpanded={expandedLessons[lesson.id] || false}
          onToggleExpand={() => toggleLessonExpand(lesson.id)}
        />
      ))}
    </div>
  );
}
