"use client";

import { Button } from "@/presentation/ui/button";
import { FileVideo, ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
  thumbnail?: string;
  onThumbnailChange: (url: string) => void;
}

export function VideoUploader({
  value,
  onChange,
  thumbnail,
  onThumbnailChange,
}: VideoUploaderProps) {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    thumbnail || null
  );
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setVideoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoPreviewUrl(null);
    }
  }, [value]);

  useEffect(() => {
    setThumbnailPreviewUrl(thumbnail || null);
  }, [thumbnail]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onChange(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setThumbnailPreviewUrl(url);
      onThumbnailChange(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      onChange(file);
    }
  };

  const captureCurrentFrame = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setThumbnailPreviewUrl(url);
          onThumbnailChange(url);
        }
      },
      "image/jpeg",
      0.95
    );
  };

  const removeVideo = () => {
    onChange(null);
    setVideoPreviewUrl(null);
  };

  const removeThumbnail = () => {
    setThumbnailPreviewUrl(null);
    onThumbnailChange("");
  };

  return (
    <div className="space-y-4 p-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {videoPreviewUrl ? (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
              <video
                ref={videoRef}
                src={videoPreviewUrl}
                className="w-full h-full object-contain"
                controls
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={removeVideo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {value?.name} ({(value!.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FileVideo className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Arraste e solte seu vídeo aqui
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Suporta MP4, WebM e outros formatos de vídeo
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Vídeo
            </Button>
          </div>
        )}
      </div>

      {videoPreviewUrl && (
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Miniatura do Vídeo</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {thumbnailPreviewUrl ? (
                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                  <img
                    src={thumbnailPreviewUrl || "/placeholder.svg"}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeThumbnail}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border border-dashed rounded-md aspect-video">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhuma miniatura definida
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground mb-2">
                Escolha uma miniatura para o seu vídeo ou capture um frame do
                vídeo.
              </p>

              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />

              <Button
                variant="outline"
                onClick={() => thumbnailInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload
              </Button>

              <Button
                variant="outline"
                onClick={captureCurrentFrame}
                className="w-full"
                disabled={!videoRef.current}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Capturar Frame Atual
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
