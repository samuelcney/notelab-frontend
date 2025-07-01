"use client";

import { useGetCourseById, useGetLessonsByModuleId } from "@/main/hooks";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetEnrollmentsByUserId } from "@/main/hooks/enrollments/use-get-enrollments";
import { useGetUserById } from "@/main/hooks/users/use-get-user-by-id";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";
import { Badge } from "@/presentation/components/badges/Badge";
import { AccordionChapter } from "@/presentation/components/chapters/AccordionChapter";
import { ChapterAccordionSkeleton } from "@/presentation/components/chapters/ChapterAccordionSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Separator } from "@/presentation/ui/separator";
import { Skeleton } from "@/presentation/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/presentation/ui/tabs";
import type { UserType } from "@/types/types";
import { pathNameEnum } from "@/utils/Enums";
import {
  convertToEmbedUrl,
  getEmailLink,
  getInitials,
  getWhatsappLink,
} from "@/utils/Functions";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Play,
} from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CoursePage() {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";
  const { push } = useRouter();
  const { courseId } = useParams();

  const user = useCurrentUser();

  const { data: course, isPending } = useGetCourseById(String(courseId));
  const { data: instructor } = useGetUserById(course?.instructorId ?? "");
  const { data: enrollments } = useGetEnrollmentsByUserId(user?.id ?? "");

  const [currentModuleId, setCurrentModuleId] = useState<string | null>("");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>("");
  const [showDescription, setShowDescription] = useState(true);

  const { data: currentModuleLessons } = useGetLessonsByModuleId(
    currentModuleId ?? ""
  );

  const currentLesson = currentModuleLessons?.find(
    (lesson) => lesson.id.toString() === currentLessonId
  );

  const phone = instructor?.userBio?.phone || "";
  const email = instructor?.email || "";

  useEffect(() => {
    if (!isPending && course?.modules && course.modules.length > 0) {
      if (!currentModuleId) {
        const firstModule = course.modules[0];
        setCurrentModuleId(firstModule.id.toString());

        if (
          firstModule.lessons &&
          firstModule.lessons.length > 0 &&
          !currentLessonId
        ) {
          setCurrentLessonId(firstModule.lessons[0].id.toString());
        }
      }
    }
  }, [isPending, course, currentModuleId, currentLessonId]);

  useEffect(() => {
    if (enrollments && enrollments.length > 0) {
      const isEnrolled = enrollments.some(
        (enrollment) => enrollment.courseId === courseId
      );
      if (!isEnrolled) {
        push(`${pathNameEnum.HOME}`);
      }
    }
  }, [enrollments, courseId, push]);

  const selectLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const embedUrl = currentLesson?.videoUrl
    ? convertToEmbedUrl(currentLesson.videoUrl)
    : "";

  if (!course && !isPending) {
    return (
      <div className="flex items-center justify-center w-full h-full flex-col gap-2">
        <h1 className="text-4xl font-bold text-greenApp">
          Ops... Curso não encontrado.
        </h1>
        <p className="text-xl">
          O curso que você tentou acessar não existe ou foi removido.
        </p>
        <a
          href={pathNameEnum.HOME}
          className="text-blue-600 underline mt-2 text-lg"
        >
          Voltar para o início
        </a>
      </div>
    );
  }

  return (
    <PageRoot isOverflowHidden>
      <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
        <div className="flex w-full lg:w-[70%] flex-col overflow-y-auto h-full pb-5">
          <div className="w-full relative bg-black">
            {!isPending && currentLesson ? (
              <>
                <div className="relative w-full aspect-video">
                  {embedUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={embedUrl}
                      title="Video Player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">
                          Nenhum vídeo disponível para esta aula
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full bg-dark-gray p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white">
                      <button
                        onClick={() => {
                          const idx = currentModuleLessons?.findIndex(
                            (lesson) => lesson.id.toString() === currentLessonId
                          );
                          if (idx !== undefined && idx > 0) {
                            setCurrentLessonId(
                              currentModuleLessons![idx - 1].id.toString()
                            );
                          }
                        }}
                        className="p-2 hover:bg-green-800 rounded-full transition-colors"
                        title="Aula anterior"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          const idx = currentModuleLessons?.findIndex(
                            (lesson) => lesson.id.toString() === currentLessonId
                          );
                          if (
                            idx !== undefined &&
                            currentModuleLessons &&
                            idx < currentModuleLessons.length - 1
                          ) {
                            setCurrentLessonId(
                              currentModuleLessons[idx + 1].id.toString()
                            );
                          }
                        }}
                        className="p-2 hover:bg-green-800 rounded-full transition-colors"
                        title="Próxima aula"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowDescription(!showDescription)}
                        className="flex items-center gap-1 text-sm hover:bg-green-800 px-3 py-1 rounded transition-colors text-white"
                      >
                        <Info className="w-4 h-4" />
                        {showDescription
                          ? "Ocultar detalhes"
                          : "Mostrar detalhes"}
                        {showDescription ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mt-3 ml-2 text-white">
                    {currentLesson.title}
                  </h2>
                </div>
              </>
            ) : (
              <Skeleton className="w-full aspect-video" />
            )}
          </div>

          <div className="flex items-center gap-4 p-2 min-h-[100px]">
            <div className="flex flex-row gap-6 w-full justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-3xl leading-tight max-sm:text-xl">
                  {course?.name}
                </h1>
              </div>

              <div className="flex flex-row h-6 gap-2 mt-2">
                <div className="flex gap-2">
                  {course?.categories.map((item) => (
                    <Badge.Category key={item.id} categoryName={item.name} />
                  ))}
                </div>
                <span className="w-[1px] h-full bg-foreground" />
                <Badge.Level level={course?.difficulty ?? ""} />
              </div>
            </div>
          </div>

          {showDescription && (
            <div className="p-3 w-full">
              <div className="flex mt-8 w-full justify-center px-8 flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg font-semibold">Instrutor:</h1>
                  <AvatarBallComponent
                    abbreviation={getInitials(course?.instructor?.name ?? "")}
                    isBigSize
                    user={instructor ?? ({} as UserType)}
                  />
                  <p className="text-sm">{instructor?.name}</p>
                  {email && (
                    <a
                      href={getEmailLink(email)}
                      className="text-sm text-blue-600 underline hover:text-blue-700"
                    >
                      {email}
                    </a>
                  )}
                  {phone && (
                    <a
                      href={getWhatsappLink(
                        phone,
                        `Olá, ${instructor?.name}! Gostaria de tirar algumas dúvidas sobre as aulas do curso *${course?.name}*. Podemos conversar?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 underline hover:text-green-700"
                    >
                      {phone}
                    </a>
                  )}
                </div>

                <Separator className="hidden lg:block w-[1px] h-full bg-foreground" />

                <div className="flex flex-col gap-6 flex-1 overflow-hidden">
                  <Tabs defaultValue="course-description" className="w-full">
                    <TabsList className="mb-2">
                      <TabsTrigger
                        value="course-description"
                        className="text-sm font-semibold"
                      >
                        Descrição do Curso
                      </TabsTrigger>
                      {currentLesson?.description && (
                        <TabsTrigger
                          value="lesson-description"
                          className="text-sm font-semibold"
                        >
                          Descrição da Aula
                        </TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="course-description" className="w-full">
                      <MDEditor
                        value={course?.description ?? ""}
                        preview="preview"
                        hideToolbar
                        className="w-full min-h-[400px] bg-background overflow-y-auto rounded-lg p-4"
                        data-color-mode={
                          currentTheme === "dark" ? "dark" : "light"
                        }
                      />
                    </TabsContent>

                    <TabsContent value="lesson-description">
                      <MDEditor
                        value={currentLesson?.description ?? ""}
                        preview="preview"
                        hideToolbar
                        className="w-full min-h-[400px] bg-background overflow-y-auto rounded-lg p-4"
                        data-color-mode={
                          currentTheme === "dark" ? "dark" : "light"
                        }
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>

        <span className="hidden lg:block h-full w-[1px] bg-light-gray" />

        <div className="hidden lg:flex w-[30%] flex-col px-2 h-full">
          {isPending ? (
            <ChapterAccordionSkeleton />
          ) : (
            <AccordionChapter
              chapterList={course?.modules ?? []}
              courseId={String(courseId)}
              onLessonSelect={selectLesson}
              currentLessonId={currentLessonId}
              currentModuleId={currentModuleId}
            />
          )}
        </div>

        <div className="block lg:hidden px-4 mt-6 max-lg:border-t border-foreground max-lg:mb-4">
          {isPending ? (
            <ChapterAccordionSkeleton />
          ) : (
            <AccordionChapter
              chapterList={course?.modules ?? []}
              courseId={String(courseId)}
              onLessonSelect={selectLesson}
              currentLessonId={currentLessonId}
              currentModuleId={currentModuleId}
            />
          )}
        </div>
      </div>
    </PageRoot>
  );
}
