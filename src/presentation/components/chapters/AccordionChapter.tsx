"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/ui/accordion";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface Module {
  id: number;
  name: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  videoUrl?: string;
}

interface ChapterAccordionProps {
  chapterList: Module[];
  courseId: string;
  onLessonSelect?: (moduleId: string, lessonId: string) => void;
  currentLessonId?: string | null;
  currentModuleId?: string | null;
}

export function AccordionChapter({
  chapterList,
  courseId,
  onLessonSelect,
  currentLessonId,
  currentModuleId,
}: ChapterAccordionProps) {
  const router = useRouter();

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    if (onLessonSelect) {
      onLessonSelect(moduleId, lessonId);
    } else {
      router.push(
        `/dashboard/course/${courseId}/lesson/${lessonId}?moduleId=${moduleId}`
      );
    }
  };

  const allModuleIds = chapterList.map((m) => m.id.toString());

  return (
    <div className="flex flex-col h-full overflow-y-auto px-2">
      <h2 className="text-xl font-semibold p-4 border-b">Conteúdo do Curso</h2>

      <Accordion
        type="multiple"
        className="w-full no-underline"
        defaultValue={allModuleIds}
      >
        {chapterList.map((module) => (
          <AccordionItem
            key={module.id}
            value={module.id.toString()}
            className="border-b"
          >
            <AccordionTrigger className="px-4 py-3 transition-colors bg-green-600">
              <div className="flex items-center gap-2 text-left">
                <span className="font-medium text-white">{module.name}</span>
                <span className="text-xs text-gray-300">
                  ({module.lessons.length} aulas)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() =>
                      handleLessonClick(
                        module.id.toString(),
                        lesson.id.toString()
                      )
                    }
                    className={`flex items-center gap-3 p-3 text-left hover:transition-colors hover:bg-green-300/35 text-foreground ${
                      currentLessonId === lesson.id.toString()
                        ? "border-l-4 border-green-500"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border border-green-500 ${
                        currentLessonId === lesson.id.toString()
                          ? "bg-blue-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Play
                        className={`w-4 h-4 ${
                          currentLessonId === lesson.id.toString()
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`flex-1 ${
                        currentLessonId === lesson.id.toString()
                          ? "font-medium"
                          : ""
                      }`}
                    >
                      {lesson.title}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
