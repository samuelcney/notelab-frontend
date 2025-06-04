"use client";

import type { Lesson } from "@/main/stores/course-store";
import { useCourseStore } from "@/main/stores/course-store";
import { notify } from "@/presentation/components/toast/Toast";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { lessonTypeEnum } from "@/utils/Enums";
import { Edit, ExternalLink, Play, Save, Video, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

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

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

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
      if (!isValidUrl(tempContent)) {
        notify("URL inválida", "error");
        return;
      }
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

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getVimeoVideoId = (url: string) => {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getVideoType = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    if (url.includes("vimeo.com")) {
      return "vimeo";
    }
    return "other";
  };

  useEffect(() => {
    let fileUrl: string | null = null;

    if (lesson.videoUrl instanceof File) {
      fileUrl = URL.createObjectURL(lesson.videoUrl);
    }

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [lesson.videoUrl]);

  const renderVideoPreview = () => {
    const videoUrl = typeof lesson.videoUrl === "string" ? lesson.videoUrl : "";

    if (!videoUrl && !lesson.videoUrl) return null;

    if (lesson.videoUrl instanceof File) {
      const fileUrl = URL.createObjectURL(lesson.videoUrl);
      return (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-foreground">Preview do Vídeo</h4>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video controls className="w-full h-full" preload="metadata">
                <source src={fileUrl} type={lesson.videoUrl.type} />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span>Arquivo: {lesson.videoUrl.name}</span>
              <span>
                Tamanho: {(lesson.videoUrl.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
          </div>
        </div>
      );
    }
    if (videoUrl) {
      const videoType = getVideoType(videoUrl);

      return (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-red-600" />
            <h4 className="font-medium text-foreground">Preview do Vídeo</h4>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <ExternalLink className="w-3 h-3" />
              Abrir original
            </a>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
            {videoType === "youtube" && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {(() => {
                  const videoId = getYouTubeVideoId(videoUrl);
                  if (videoId) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    );
                  }
                  return (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p>URL do YouTube inválida</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {videoType === "vimeo" && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {(() => {
                  const videoId = getVimeoVideoId(videoUrl);
                  if (videoId) {
                    return (
                      <iframe
                        src={`https://player.vimeo.com/video/${videoId}`}
                        title="Vimeo video player"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    );
                  }
                  return (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
                        <p>URL do Vimeo inválida</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {videoType === "other" && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video controls className="w-full h-full" preload="metadata">
                  <source src={videoUrl} />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    videoType === "youtube"
                      ? "bg-red-500"
                      : videoType === "vimeo"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                />
                {videoType === "youtube"
                  ? "YouTube"
                  : videoType === "vimeo"
                  ? "Vimeo"
                  : "Vídeo Direto"}
              </span>
              <span className="break-all max-w-xs truncate">{videoUrl}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
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
              disabled={!isEditing}
            />
            <p className="text-xs text-muted-foreground">
              Exemplo: "https://www.youtube.com/xxxxxx"
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2">
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
                className="text-white border border-foreground"
              >
                <Save className="mr-2 h-3 w-3" />
                Salvar Conteúdo
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={startEditing}
              className="text-white border border-foreground"
            >
              <Edit className="mr-2 h-3 w-3" />
              Editar Conteúdo
            </Button>
          )}
        </div>
      </div>
      {renderVideoPreview()}
    </>
  );
}
