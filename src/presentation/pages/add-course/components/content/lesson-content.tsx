"use client";

import type { Lesson } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { notify } from "@/presentation/components/toast/Toast";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { lessonTypeEnum } from "@/utils/Enums";
import { Edit, ExternalLink, Play, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface LessonContentProps {
  lesson: Lesson;
  moduleId: string;
}

export function LessonContent({ lesson, moduleId }: LessonContentProps) {
  const { addContentToLesson } = useCourseStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(
    typeof lesson.videoUrl === "string" ? lesson.videoUrl : ""
  );
  const [tempDescription, setTempDescription] = useState(
    lesson.description ?? ""
  );

  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ["youtube.com", "youtu.be", "vimeo.com"].some((domain) =>
        parsed.hostname.includes(domain)
      );
    } catch {
      return false;
    }
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    return match?.[1] ?? null;
  };

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/);
    return match?.[1] ?? null;
  };

  const startEditing = () => setIsEditing(true);

  const cancelEditing = () => {
    setIsEditing(false);
    setTempUrl(typeof lesson.videoUrl === "string" ? lesson.videoUrl : "");
    setTempDescription(lesson.description ?? "");
  };

  const saveContent = () => {
    if (lesson.type === lessonTypeEnum.VIDEO_URL && isValidUrl(tempUrl)) {
      addContentToLesson(moduleId, lesson.id, tempUrl, tempDescription);
      setIsEditing(false);
    } else {
      notify("URL inválida (somente YouTube ou Vimeo)", "error");
    }
  };

  const renderVideoPreview = () => {
    const url = typeof lesson.videoUrl === "string" ? lesson.videoUrl : "";
    if (!url) return null;

    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    const isVimeo = url.includes("vimeo.com");

    let embedUrl: string | null = null;

    if (isYouTube) {
      const id = getYouTubeId(url);
      if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (isVimeo) {
      const id = getVimeoId(url);
      if (id) embedUrl = `https://player.vimeo.com/video/${id}`;
    }

    if (!embedUrl) return null;

    return (
      <div className="mt-4 space-y-3 w-full">
        <div className="flex items-center gap-2">
          <Play className="w-5 h-5 text-red-600" />
          <h4 className="font-medium text-foreground">Preview do Vídeo</h4>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            Abrir original
          </a>
        </div>
        <div className="aspect-video bg-black rounded-lg overflow-hidden border">
          <iframe
            src={embedUrl}
            title="Preview do Vídeo"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      <div className="mt-4 space-y-4 rounded-md p-4 border border-foreground bg-background">
        {lesson.type === lessonTypeEnum.VIDEO_URL && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              URL do Vídeo
            </Label>
            <Input
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={!isEditing}
            />
            <p className="text-xs text-muted-foreground">
              Somente YouTube ou Vimeo são suportados.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Descrição da Aula
          </Label>
          <div>
            <MDEditor
              value={tempDescription}
              onChange={(v) => setTempDescription(v || "")}
              preview="edit"
              height={200}
              visibleDragbar={false}
              textareaProps={{ disabled: !isEditing }}
              className="border border-foreground rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {isEditing ? (
            <>
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
                className="text-foreground border border-foreground bg-background"
              >
                <Save className="mr-2 h-3 w-3" />
                Salvar
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={startEditing}
              className="text-foreground border border-foreground bg-background"
            >
              <Edit className="mr-2 h-3 w-3" />
              Editar Conteúdo
            </Button>
          )}
        </div>
      </div>

      {renderVideoPreview()}
    </div>
  );
}
