"use client";

import { useGetCourseById } from "@/main/hooks";
import { useGetUserById } from "@/main/hooks/users/use-get-user-by-id";
import { ChapterAccordion } from "@/presentation/components/chapters/ChapterAccordion";
import { ChapterAccordionSkeleton } from "@/presentation/components/chapters/ChapterAccordionSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { CoursePresentation } from "@/presentation/pages/course-presentation";
import { Skeleton } from "@/presentation/ui/skeleton";
import { BACKGROUND_IMAGE_PATHS } from "@/utils/Constants";
import { pathNameEnum } from "@/utils/Enums";
import { getRandomItem } from "@/utils/Functions";

import { useParams } from "next/navigation";

export default function CoursePage() {
  const { courseId } = useParams();

  const { data, isPending } = useGetCourseById(String(courseId));

  const { data: instructor } = useGetUserById(data?.instructorId ?? "");

  const randomImagePath = getRandomItem(BACKGROUND_IMAGE_PATHS);

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
          <div className="w-full">
            {!isPending ? (
              <img
                src={data?.coverImage || randomImagePath}
                alt="Banner"
                width={1350}
                height={300}
                className="object-cover w-full h-80 aspect-square"
              />
            ) : (
              <Skeleton className="w-full h-72" />
            )}
          </div>
          <div className="p-3 w-full">
            <CoursePresentation.Header isPending={isPending} data={data!} />
            <CoursePresentation.Info
              isPending={isPending}
              data={data!}
              instructor={instructor}
            />
          </div>
        </div>

        <span className="h-full w-[1px] bg-light-gray" />

        <div className="flex w-[30%] flex-col px-2 h-full">
          {isPending ? (
            <ChapterAccordionSkeleton />
          ) : (
            <ChapterAccordion
              chapterList={data?.modules ?? []}
              courseId={Number(courseId)}
              isPresentation={true}
            />
          )}
        </div>
      </div>
    </PageRoot>
  );
}
