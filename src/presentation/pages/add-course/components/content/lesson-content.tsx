"use client";

import type React from "react";

import type { Lesson } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { lessonTypeEnum } from "@/utils/Enums";
import { Edit, Save, Video, X } from "lucide-react";
import { useState } from "react";

interface LessonContentProps {
  lesson: Lesson;
  moduleId: string;
}

export function LessonContent({ lesson, moduleId }: LessonContentProps) {
  const { addContentToLesson } = useCourseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<string>(
    typeof lesson.videoUrl === "string" ? lesson.videoUrl : ""
  );
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const startEditing = () => {
    setIsEditing(true);
    if (typeof lesson.videoUrl === "string") {
      setTempContent(lesson.videoUrl);
    } else {
      setTempContent("");
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTempContent("");
    setFileUpload(null);
  };

  const saveContent = () => {
    if (lesson.type === lessonTypeEnum.VIDEO && fileUpload) {
      addContentToLesson(moduleId, lesson.id, fileUpload);
    } else if (lesson.type === lessonTypeEnum.VIDEO_URL) {
      addContentToLesson(moduleId, lesson.id, tempContent);
    }
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUpload(file);
    }
  };

  if (!isEditing) {
    return (
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {lesson.videoUrl ? (
            <div className="flex items-center">
              {lesson.type === lessonTypeEnum.VIDEO && (
                <Video className="mr-2 h-4 w-4" />
              )}
              {lesson.type === lessonTypeEnum.VIDEO_URL && (
                <Video className="mr-2 h-4 w-4" />
              )}

              {lesson.type === lessonTypeEnum.VIDEO && (
                <span>
                  {lesson.videoUrl instanceof File
                    ? lesson.videoUrl.name
                    : "Arquivo de vídeo carregado"}
                </span>
              )}
              {lesson.type === lessonTypeEnum.VIDEO_URL && (
                <span>
                  {typeof lesson.videoUrl === "string"
                    ? lesson.videoUrl
                    : "URL de vídeo"}
                </span>
              )}
            </div>
          ) : (
            <span className="italic">Nenhum conteúdo adicionado</span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={startEditing}
          className="text-foreground border-foreground border"
        >
          <Edit className="mr-2 h-3 w-3" />
          {lesson.videoUrl ? "Editar Conteúdo" : "Adicionar Conteúdo"}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 border rounded-md p-4 border-foreground">
      {lesson.type === lessonTypeEnum.VIDEO && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Upload de Vídeo
          </label>
          <div className="flex items-center gap-2">
            <Input type="file" accept="video/*" onChange={handleFileChange} />
          </div>
          {fileUpload && (
            <p className="text-sm text-muted-foreground">
              Arquivo selecionado: {fileUpload.name}
            </p>
          )}
        </div>
      )}

      {lesson.type === lessonTypeEnum.VIDEO_URL && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            URL do Vídeo
          </label>
          <Input
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Cole a URL do vídeo aqui (YouTube, Vimeo, etc.)"
          />
          <p className="text-xs text-muted-foreground">
            Exemplo: "https://www.youtube.com/xxxxxx"
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={cancelEditing}
          className="text-foreground"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={saveContent}
          className="text-white border border-foreground"
        >
          <Save className="mr-2 h-3 w-3" />
          Salvar Conteúdo
        </Button>
      </div>
    </div>
  );
}
