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
import { Checkbox } from "@/presentation/ui/checkbox";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/ui/select";
import { courseLevelEnum } from "@/utils/Enums";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useCourseStore } from "../../../main/stores/course-store";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function CourseBasicInfoForm() {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";
  const {
    course,
    setName,
    addCategory,
    removeCategory,
    setDifficulty,
    setCoverImage,
    setDescription,
  } = useCourseStore();

  const { data } = useGetCategories();

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
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
          <Label htmlFor="titulo">
            Título do Curso <span className="text-red-600">*</span>
          </Label>
          <Input
            id="titulo"
            placeholder="Ex: Violão para Iniciantes"
            value={course.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="titulo">
            Descrição <span className="text-red-600">*</span>
          </Label>

          <MDEditor
            id="titulo"
            value={course.description}
            onChange={(e) => setDescription(e || "")}
            preview="edit"
            height={200}
            visibleDragbar={false}
            className="border border-foreground rounded-md"
            data-color-mode={currentTheme === "dark" ? "dark" : "light"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoria">
              Categorias <span className="text-red-600">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-foreground border-foreground"
                >
                  {course.categories.length > 0
                    ? `${course.categories.length} categoria(s) selecionada(s)`
                    : "Selecionar categorias"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full max-w-sm border border-foreground">
                <div className="grid gap-2">
                  {data?.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-md"
                    >
                      <Checkbox
                        type="button"
                        className="text-foreground"
                        checked={course.categories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addCategory(category.id);
                          } else {
                            removeCategory(category.id);
                          }
                        }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2 mt-2">
              {course.categories.map((catId) => {
                const category = data?.find((c) => c.id === catId);
                if (!category) return null;
                return (
                  <Button
                    key={catId}
                    variant="secondary"
                    className="flex items-center gap-1 justify-between bg-foreground text-background"
                  >
                    {category.name}
                    <span
                      onClick={() => removeCategory(catId)}
                      className="ml-1 text-xs"
                    >
                      <X className="w-3 h-3" />
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nivel">
              Nível <span className="text-red-600">*</span>
            </Label>
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
                      src={URL.createObjectURL(course.coverImage)}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 rounded-full bg-background/80"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" color="red" />
                      <span className="sr-only">Remover imagem</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">
                      Clique no botão para adicionar uma imagem de capa
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
                  ref={imageInputRef}
                />
                <Button
                  variant="outline"
                  className="w-full text-foreground border-foreground"
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
