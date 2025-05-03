import { useCourseStore } from "@/main/stores/courseStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/ui/accordion";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Input } from "@/presentation/ui/input";
import { ScrollArea } from "@/presentation/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/ui/select";
import { lessonTypeEnum } from "@/utils/Enums";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  LessonContent,
  LessonContentModal,
} from "./content/lesson-content-modal";

export function CourseContentForm() {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<{
    lessonId: string;
    moduleId: string;
    type: "VIDEO" | "TEXT" | "PDF";
    defaultValue?: string | File | null;
  } | null>(null);

  const {
    course,
    addModule,
    removeModule,
    updateModuleName,
    addLesson,
    removeLesson,
    updateLesson,
    addContentToLesson,
  } = useCourseStore();

  return (
    <Card className="mt-4 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Conteúdo do Curso</CardTitle>
          <CardDescription>
            Organize seu curso em módulos e aulas.
          </CardDescription>
        </div>
        <Button onClick={addModule}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Módulo
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)] pr-4">
          <Accordion
            type="multiple"
            defaultValue={["module-1"]}
            className="space-y-4"
          >
            {course.modules.map((module) => (
              <AccordionItem
                key={module.id}
                value={`module-${module.id}`}
                className="border-b rounded-lg px-2"
              >
                <div className="flex items-center justify-between py-2">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Input
                        value={module.name}
                        onChange={(e) =>
                          updateModuleName(module.id, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-64 sm:w-96"
                        placeholder="Título do módulo"
                      />
                    </div>
                  </AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addLesson(module.id);
                      }}
                      className="text-foreground"
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Aula
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeModule(module.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover módulo</span>
                    </Button>
                  </div>
                </div>
                <AccordionContent className="pt-2">
                  <div className="space-y-3 pl-4">
                    {module.lessons.length === 0 ? (
                      <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">
                          Nenhuma aula adicionada. Clique em "Aula" para
                          adicionar uma.
                        </p>
                      </div>
                    ) : (
                      module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex flex-col gap-2 rounded-md p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                            <Input
                              value={lesson.name}
                              onChange={(e) =>
                                updateLesson(
                                  module.id,
                                  lesson.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="flex-1"
                              placeholder="Título da aula"
                            />
                            <div className="flex items-center gap-2">
                              <Select
                                value={lesson.type}
                                onValueChange={(value) =>
                                  updateLesson(
                                    module.id,
                                    lesson.id,
                                    "type",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={lessonTypeEnum.VIDEO}>
                                    Vídeo
                                  </SelectItem>
                                  <SelectItem value={lessonTypeEnum.PDF}>
                                    PDF
                                  </SelectItem>
                                  <SelectItem value={lessonTypeEnum.TEXT}>
                                    Texto
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeLesson(module.id, lesson.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remover aula</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-foreground"
                              onClick={() => {
                                setActiveLesson({
                                  lessonId: lesson.id,
                                  moduleId: module.id,
                                  type: lesson.type as "VIDEO" | "TEXT" | "PDF",
                                  defaultValue: lesson.name ?? null,
                                });
                                setIsContentModalOpen(true);
                              }}
                            >
                              Editar Conteúdo
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {course.modules.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Nenhum módulo adicionado. Clique em "Adicionar Módulo" para
                  começar.
                </p>
                <Button onClick={addModule}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Módulo
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {activeLesson && (
        <LessonContentModal
          isOpen={isContentModalOpen}
          onClose={() => {
            setIsContentModalOpen(false);
            setActiveLesson(null);
          }}
          lessonId={activeLesson.lessonId}
          moduleId={activeLesson.moduleId}
          type={activeLesson.type}
          defaultValue={activeLesson.defaultValue as LessonContent | null}
          onSave={(newContent) => {
            addContentToLesson(activeLesson.lessonId, newContent as any);
            setIsContentModalOpen(false);
            setActiveLesson(null);
          }}
        />
      )}
    </Card>
  );
}
