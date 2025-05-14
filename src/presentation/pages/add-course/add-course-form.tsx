"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useCreateCourse } from "@/main/hooks/courses/use-create-course";
import { notify } from "@/presentation/components/toast/Toast";
import { Button } from "@/presentation/ui/button";
import { Separator } from "@/presentation/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { useCourseStore } from "../../../main/stores/course-store";
import { CourseBasicInfoForm } from "./course-basic-info-form";
import { CourseConfigForm } from "./course-config-form";
import { CourseContentForm } from "./course-content-form";

export function AddCourseForm() {
  const router = useRouter();
  const { resetCourse, course, setCourse, setInstructorId } = useCourseStore();
  const { mutateAsync: createCourse, isPending } = useCreateCourse();
  const { id: instructorId } = useCurrentUser();

  const handleSubmit = async (isDraft = false) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isDraft) {
        console.log(course);
      }
      if (!isDraft) {
        localStorage.removeItem("course");
        await createCourse({ ...course, instructorId: instructorId });
        resetCourse();
        router.push("/teacher/dashboard");
      }
    } catch (error) {
      notify("Erro", "error");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-4 flex-col">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              resetCourse();
              router.replace("/teacher/dashboard");
            }}
          >
            <ArrowLeft className="h-4 w-4 cursor-pointer" />
            <span className="text-sm text-foreground hover:underline">
              Voltar
            </span>
          </span>

          <h1 className="text-2xl font-semibold">Criar Novo Curso</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleSubmit(true)}
            disabled={isPending}
            variant="outline"
            className="border-foreground"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={isPending}
            className="bg-greenApp"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Publicar Curso
          </Button>
        </div>
      </div>

      <Separator className="mb-2" />

      <Tabs defaultValue="infos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 justify-center items-center">
          <TabsTrigger value="infos">Informações Básicas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="configs">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="infos">
          <CourseBasicInfoForm />
        </TabsContent>

        <TabsContent value="content">
          <CourseContentForm />
        </TabsContent>

        <TabsContent value="configs">
          <CourseConfigForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
