"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import type React from "react";

import { useGetCategories } from "@/main/hooks";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/ui/select";
import { Textarea } from "@/presentation/ui/textarea";
import { courseLevelEnum } from "@/utils/Enums";
import { useCourseStore } from "../../../main/stores/courseStore";

export function CourseBasicInfoForm() {
  const {
    course,
    setTitle,
    setDescription,
    setCategory,
    setDifficulty,
    setCoverImage,
  } = useCourseStore();

  const { data } = useGetCategories();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mt-4 shadow-none">
      <CardHeader>
        <CardTitle>Informações do Curso</CardTitle>
        <CardDescription>
          Preencha as informações básicas do seu curso. Estas informações serão
          exibidas na página do curso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título do Curso *</Label>
          <Input
            id="titulo"
            placeholder="Ex: Violão para Iniciantes"
            value={course.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição *</Label>
          <Textarea
            id="descricao"
            placeholder="Descreva o que os alunos aprenderão neste curso..."
            className="min-h-32"
            value={course.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select value={course.category} onValueChange={setCategory}>
              <SelectTrigger id="categoria">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((category) => (
                  <SelectItem value={category.id} key={category.id}>
                    {category.name.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nivel">Nível *</Label>
            <Select value={course.difficulty} onValueChange={setDifficulty}>
              <SelectTrigger id="nivel">
                <SelectValue placeholder="Selecione um nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={courseLevelEnum.BEGINNER}>
                  Iniciante
                </SelectItem>
                <SelectItem value={courseLevelEnum.INTERMEDIATE}>
                  Intermediário
                </SelectItem>
                <SelectItem value={courseLevelEnum.ADVANCED}>
                  Avançado
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imagem">Imagem de Capa</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-foreground">
                {course.coverImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={course.coverImage || ""}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 rounded-full bg-background/80"
                      onClick={() => setCoverImage(null)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remover imagem</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">
                      Arraste uma imagem ou clique para fazer upload
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  className="w-full text-foreground"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Imagem
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Recomendações:
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use uma imagem de alta qualidade</li>
                <li>Dimensões recomendadas: 1280 x 720 pixels</li>
                <li>Formatos aceitos: JPG, PNG</li>
                <li>Tamanho máximo: 5MB</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
