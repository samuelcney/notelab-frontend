"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useCreateCourse } from "@/main/hooks/courses/use-create-course";
import { http } from "@/main/http/axios/axios-instance";
import { courseSchema } from "@/main/schemas/course.schema";
import { notify } from "@/presentation/components/toast/Toast";
import { Button } from "@/presentation/ui/button";
import { Separator } from "@/presentation/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { buildImageFormData } from "@/utils/Functions";
import { useEffect } from "react";
import { useCourseStore } from "../../../main/stores/course-store";
import { CourseBasicInfoForm } from "./course-basic-info-form";
import { CourseConfigForm } from "./course-config-form";
import { CourseContentForm } from "./course-content-form";

export function AddCourseForm() {
  const router = useRouter();
  const { resetCourse, course, setInstructorId } = useCourseStore();
  const { mutateAsync: createCourse, isPending } = useCreateCourse();
  const user = useCurrentUser();

  const handleSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const result = courseSchema.safeParse({ ...course });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        for (const messages of Object.values(fieldErrors)) {
          if (messages && messages.length > 0) {
            notify(messages[0], "error");
          }
        }

        return;
      }

      const courseData = { ...result.data };
      const { coverImage, ...coursePayload } = courseData;

      const createdCourse = await createCourse(coursePayload);

      if (coverImage && coverImage instanceof File) {
        await http.post(
          `/courses/${createdCourse.id}/cover`,
          buildImageFormData(coverImage),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      resetCourse();
      router.push("/instructor/dashboard");
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      notify("Erro inesperado ao criar curso", "error");
    }
  };

  useEffect(() => {
    if (user) {
      setInstructorId(user.id);
    }
  }, [user, setInstructorId]);

  if (!user) return null;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-4 flex-col">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              resetCourse();
              router.replace("/instructor/dashboard");
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
            onClick={() => handleSubmit()}
            disabled={isPending}
            className="bg-green-500"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Publicar Curso
          </Button>
        </div>
      </div>

      <Separator className="mb-2 bg-foreground" />

      <Tabs defaultValue="infos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 justify-center items-center max-sm:grid-cols-1 h-auto max-sm:gap-2">
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
