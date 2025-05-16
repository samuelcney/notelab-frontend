"use client";

import type React from "react";

import { Button } from "@/presentation/ui/button";
import { FileText, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PdfUploaderProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export function PdfUploader({ value, onChange }: PdfUploaderProps) {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPdfPreviewUrl(url);
      generatePdfPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPdfPreviewUrl(null);
      setPreviewPages([]);
    }
  }, [value]);

  const generatePdfPreview = async (url: string) => {
    try {
      setPreviewPages([url]);
    } catch (error) {
      console.error("Error generating PDF preview:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onChange(file);
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
    if (file && file.type === "application/pdf") {
      onChange(file);
    }
  };

  const removePdf = () => {
    onChange(null);
    setPdfPreviewUrl(null);
    setPreviewPages([]);
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
        {pdfPreviewUrl ? (
          <div className="space-y-4">
            <div className="relative rounded-md overflow-hidden border">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <iframe
                  src={`${pdfPreviewUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={removePdf}
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
            <FileText className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Arraste e solte seu PDF aqui
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Apenas arquivos PDF são suportados
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Selecionar PDF
            </Button>
          </div>
        )}
      </div>

      {previewPages.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Visualização do PDF</h3>

          <div className="flex items-center justify-center p-4 bg-muted rounded-md">
            <p className="text-center text-sm">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              PDF carregado com sucesso!
              <br />
              <span className="text-muted-foreground">
                O documento será exibido para os alunos quando a aula for
                publicada.
              </span>
            </p>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Dicas para PDFs:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Certifique-se de que o texto no PDF é pesquisável</li>
              <li>Use títulos e estrutura clara para melhor acessibilidade</li>
              <li>
                Mantenha o tamanho do arquivo razoável para carregamento rápido
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
