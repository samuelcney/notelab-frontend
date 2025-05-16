"use client";

import { Check, FileText, Loader2, Video } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/presentation/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { PdfUploader } from "./pdf-uploader";
import { TextEditor } from "./text-editor";
import { VideoUploader } from "./video-uploader";

type LessonType = "VIDEO" | "PDF" | "TEXT";

export interface LessonContent {
  type: LessonType;
  data: string | File | null;
  metadata?: {
    title?: string;
    description?: string;
    duration?: string;
    thumbnail?: string;
    lastModified?: number;
  };
}

interface LessonContentModalProps {
  lessonId: string;
  moduleId: string;
  type: LessonType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: LessonContent) => void;
  defaultValue?: LessonContent | null;
}

export function LessonContentModal({
  lessonId,
  moduleId,
  type,
  isOpen,
  onClose,
  onSave,
  defaultValue = null,
}: LessonContentModalProps) {
  const [activeTab, setActiveTab] = useState<string>("content");
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<LessonContent>({
    type,
    data: null,
    metadata: {
      title: "",
      description: "",
      duration: "",
      thumbnail: "",
      lastModified: Date.now(),
    },
  });

  useEffect(() => {
    if (defaultValue) {
      setContent(defaultValue);
    } else {
      setContent({
        type,
        data: null,
        metadata: {
          title: "",
          description: "",
          duration: "",
          thumbnail: "",
          lastModified: Date.now(),
        },
      });
    }
  }, [lessonId, defaultValue, type, isOpen]);

  const handleUpdateMetadata = (key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value,
      },
    }));
  };

  const handleTextChange = (value: string) => {
    setContent((prev) => ({
      ...prev,
      data: value,
      metadata: {
        ...prev.metadata,
        lastModified: Date.now(),
      },
    }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setContent((prev) => ({
      ...prev,
      data: file,
      metadata: {
        ...prev.metadata,
        title: prev.metadata?.title || file.name.split(".")[0],
        lastModified: Date.now(),
      },
    }));
  };

  const handleSave = async () => {
    if (!content.data) {
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      onSave({
        ...content,
        metadata: {
          ...content.metadata,
          lastModified: Date.now(),
        },
      });

      onClose();
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  const getContentIcon = () => {
    switch (type) {
      case "TEXT":
        return <FileText className="h-5 w-5" />;
      case "VIDEO":
        return <Video className="h-5 w-5" />;
      case "PDF":
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getContentTitle = () => {
    switch (type) {
      case "TEXT":
        return "Conteúdo de Texto";
      case "VIDEO":
        return "Conteúdo de Vídeo";
      case "PDF":
        return "Documento PDF";
      default:
        return "Conteúdo da Aula";
    }
  };

  const hasContent = !!content.data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            {getContentIcon()}
            <DialogTitle>{getContentTitle()}</DialogTitle>
          </div>
          {hasContent && (
            <div className="flex items-center text-xs text-muted-foreground">
              <span>
                Última modificação:{" "}
                {content.metadata?.lastModified
                  ? new Date(content.metadata.lastModified).toLocaleString()
                  : "Agora"}
              </span>
            </div>
          )}
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="content" className="h-full">
              {type === "TEXT" && (
                <TextEditor
                  value={typeof content.data === "string" ? content.data : ""}
                  onChange={handleTextChange}
                />
              )}

              {type === "VIDEO" && (
                <VideoUploader
                  value={content.data instanceof File ? content.data : null}
                  onChange={handleFileChange}
                  thumbnail={content.metadata?.thumbnail}
                  onThumbnailChange={(url: any) =>
                    handleUpdateMetadata("thumbnail", url)
                  }
                />
              )}

              {type === "PDF" && (
                <PdfUploader
                  value={content.data instanceof File ? content.data : null}
                  onChange={handleFileChange}
                />
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 p-4">
              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Título do conteúdo"
                    value={content.metadata?.title || ""}
                    onChange={(e) =>
                      handleUpdateMetadata("title", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Descrição do conteúdo"
                    value={content.metadata?.description || ""}
                    onChange={(e) =>
                      handleUpdateMetadata("description", e.target.value)
                    }
                  />
                </div>

                {type === "VIDEO" && (
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium mb-1"
                    >
                      Duração (mm:ss)
                    </label>
                    <input
                      id="duration"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ex: 10:30"
                      value={content.metadata?.duration || ""}
                      onChange={(e) =>
                        handleUpdateMetadata("duration", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center">
            {hasContent ? (
              <div className="flex items-center text-sm text-green-600">
                <Check className="h-4 w-4 mr-1" />
                <span>Conteúdo pronto para salvar</span>
              </div>
            ) : (
              <div className="flex items-center text-sm text-amber-600">
                <span>Adicione conteúdo para continuar</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!hasContent || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Conteúdo"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
