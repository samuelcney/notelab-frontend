"use client";

import { useGetCourseById, useGetLessonsByModuleId } from "@/main/hooks";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetEnrollments } from "@/main/hooks/enrollments/use-get-enrollments";
import { useGetUserById } from "@/main/hooks/users/use-get-user-by-id";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";
import { Badge } from "@/presentation/components/badges/Badge";
import { AccordionChapter } from "@/presentation/components/chapters/AccordionChapter";
import { ChapterAccordionSkeleton } from "@/presentation/components/chapters/ChapterAccordionSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Separator } from "@/presentation/ui/separator";
import { Skeleton } from "@/presentation/ui/skeleton";
import type { UserType } from "@/types/types";
import { pathNameEnum } from "@/utils/Enums";
import { convertToEmbedUrl, getInitials } from "@/utils/Functions";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Play,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const { push } = useRouter();
  const { courseId } = useParams();
  const searchParams = useSearchParams();

  const user = useCurrentUser();

  const { data, isPending } = useGetCourseById(String(courseId));
  const { data: instructor } = useGetUserById(data?.instructorId ?? "");
  const { data: enrollments } = useGetEnrollments(user?.id ?? "");

  const [currentModuleId, setCurrentModuleId] = useState<string | null>("");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>("");
  const [showDescription, setShowDescription] = useState(true);

  const { data: currentModuleLessons, isPending: isLessonsPending } =
    useGetLessonsByModuleId(currentModuleId ?? "");

  const currentLesson = currentModuleLessons?.find(
    (lesson) => lesson.id.toString() === currentLessonId
  );

  useEffect(() => {
    if (!isPending && data?.modules && data.modules.length > 0) {
      if (!currentModuleId) {
        const firstModule = data.modules[0];
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
  }, [isPending, data, currentModuleId, currentLessonId]);

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

  const navigateToNextLesson = () => {
    if (!currentModuleLessons || !currentLessonId) return;

    const currentIndex = currentModuleLessons.findIndex(
      (lesson) => lesson.id.toString() === currentLessonId
    );
    if (currentIndex < currentModuleLessons.length - 1) {
      setCurrentLessonId(currentModuleLessons[currentIndex + 1].id.toString());
    } else if (data?.modules) {
      const currentModuleIndex = data.modules.findIndex(
        (module) => module.id.toString() === currentModuleId
      );
      if (currentModuleIndex < data.modules.length - 1) {
        const nextModule = data.modules[currentModuleIndex + 1];
        setCurrentModuleId(nextModule.id.toString());
        if (nextModule.lessons && nextModule.lessons.length > 0) {
          setCurrentLessonId(nextModule.lessons[0].id.toString());
        }
      }
    }
  };

  const navigateToPreviousLesson = () => {
    if (!currentModuleLessons || !currentLessonId) return;

    const currentIndex = currentModuleLessons.findIndex(
      (lesson) => lesson.id.toString() === currentLessonId
    );
    if (currentIndex > 0) {
      setCurrentLessonId(currentModuleLessons[currentIndex - 1].id.toString());
    } else if (data?.modules && currentModuleId) {
      const currentModuleIndex = data.modules.findIndex(
        (module) => module.id.toString() === currentModuleId
      );
      if (currentModuleIndex > 0) {
        const prevModule = data.modules[currentModuleIndex - 1];
        setCurrentModuleId(prevModule.id.toString());
        if (prevModule.lessons && prevModule.lessons.length > 0) {
          setCurrentLessonId(
            prevModule.lessons[prevModule.lessons.length - 1].id.toString()
          );
        }
      }
    }
  };

  const selectLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const embedUrl = currentLesson?.videoUrl
    ? convertToEmbedUrl(currentLesson.videoUrl)
    : "";

  if (!data && !isPending) {
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
      <div className="flex flex-1 w-full items-center h-full overflow-hidden">
        <div className="flex w-[70%] flex-col overflow-y-auto h-full pb-5">
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
                        onClick={navigateToPreviousLesson}
                        className="p-2 hover:bg-green-800 rounded-full transition-colors"
                        title="Aula anterior"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={navigateToNextLesson}
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

          {showDescription && (
            <div className="p-3 w-full">
              <div className="flex items-center gap-4 p-2 min-h-[100px]">
                <div className="flex flex-row gap-6 w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-3xl leading-tight">
                      {data?.name}
                    </h1>
                  </div>

                  <div className="flex flex-row h-6 gap-2 mt-2">
                    <div className="flex gap-2">
                      {data?.categories.map((item) => (
                        <Badge.Category
                          key={item.id}
                          categoryName={item.name}
                        />
                      ))}
                    </div>
                    <span className="w-[1px] h-full bg-foreground" />
                    <Badge.Level level={data?.difficulty ?? ""} />
                  </div>
                </div>
              </div>
              <div className="flex mt-8 w-full justify-center px-8">
                <div className="flex w-full justify-between gap-20 overflow-hidden">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Instrutor:</h1>
                    <AvatarBallComponent
                      abbreviation={getInitials(data?.instructor?.name ?? "")}
                      isBigSize
                      user={instructor ?? ({} as UserType)}
                    />
                    <p className="text-sm">{instructor?.name}</p>
                    <p className="text-sm">{instructor?.email}</p>
                    {instructor?.userBio?.phone && (
                      <p className="text-sm">{instructor?.userBio.phone}</p>
                    )}
                  </div>

                  <Separator className="w-[1px] h-full bg-foreground" />

                  <div className="flex flex-col gap-6 flex-1 overflow-hidden">
                    <div className="flex flex-col gap-2 break-words">
                      <p className="flex-1 text-justify text-sm tracking-wide break-words">
                        {data?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <span className="h-full w-[1px] bg-light-gray" />

        <div className="flex w-[30%] flex-col px-2 h-full">
          {isPending ? (
            <ChapterAccordionSkeleton />
          ) : (
            <AccordionChapter
              chapterList={data?.modules ?? []}
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
