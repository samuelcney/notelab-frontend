"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { notify } from "@/presentation/components/toast/Toast";
import { Button } from "@/presentation/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { useCourseStore } from "../../../main/stores/courseStore";
import { CourseBasicInfoForm } from "./course-basic-info-form";
import { CourseContentForm } from "./course-content-form";

export function AddCourseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetCourse, course } = useCourseStore();

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      resetCourse();

      console.log("Course data:", course);

      if (!isDraft) {
        router.push("/teacher/dashboard");
      }
    } catch (error) {
      notify("Erro", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Criar Novo Curso</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Salvar Rascunho
          </Button>
          <Button onClick={() => handleSubmit(false)} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Publicar Curso
          </Button>
        </div>
      </div>

      <Tabs defaultValue="infos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 justify-center items-center">
          <TabsTrigger value="infos">Informações Básicas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="infos">
          <CourseBasicInfoForm />
        </TabsContent>

        <TabsContent value="content">
          <CourseContentForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
