"use client";

import { useGetCourseById } from "@/main/hooks";
import { useGetUserById } from "@/main/hooks/users/use-get-user-by-id";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";
import { Badge } from "@/presentation/components/badges/Badge";
import { Button } from "@/presentation/components/button";
import { ChapterAccordion } from "@/presentation/components/chapters/ChapterAccordion";
import { ChapterAccordionSkeleton } from "@/presentation/components/chapters/ChapterAccordionSkeleton";
import { CourseContentSkeleton } from "@/presentation/components/course-details/CourseContentSkeleton";
import { CourseHeaderSkeleton } from "@/presentation/components/course-details/CourseHeaderSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Skeleton } from "@/presentation/ui/skeleton";
import { UserType } from "@/types/types";
import { BACKGROUND_IMAGE_PATHS } from "@/utils/Constants";
import { getInitials, getRandomItem } from "@/utils/Functions";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const { courseId } = useParams();

  const { data, isPending } = useGetCourseById(Number(courseId));

  const { data: instructor } = useGetUserById(data?.instructorId ?? "");

  const randomImagePath = getRandomItem(BACKGROUND_IMAGE_PATHS);

  return (
    <PageRoot isOverflowHidden>
      <div className="flex flex-1 w-full items-center h-full overflow-hidden">
        <div className="flex w-[70%] flex-col overflow-y-auto h-full pb-5">
          <div className="w-full">
            {!isPending ? (
              <Image
                src={randomImagePath}
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
            <div className="flex items-center gap-4 p-2 min-h-[100px]">
              {!isPending ? (
                <div className="flex flex-row gap-6 w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-3xl leading-tight">
                      {data?.name}
                    </h1>
                    <h2 className="text-greenApp text-xl">R$ {data?.price}</h2>
                  </div>

                  <div className="flex flex-row h-6 gap-2 mt-2">
                    <div className="flex gap-2">
                      {data?.categories.map((item) => (
                        <Badge.Category
                          key={item.category.id}
                          categoryName={item.category.name}
                        />
                      ))}
                    </div>
                    <span className="w-[1px] h-full bg-foreground" />
                    <Badge.Level level={data?.difficulty ?? ""} />
                  </div>
                </div>
              ) : (
                <CourseHeaderSkeleton />
              )}
            </div>
            {!isPending ? (
              <div className="flex mt-8 w-full justify-center px-8">
                <div className="flex w-full justify-between gap-20">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Instrutor:</h1>
                    <AvatarBallComponent
                      abbreviation={getInitials(data?.instructor?.name ?? "")}
                      isBigSize
                      user={instructor ?? ({} as UserType)}
                    />
                    <p className="text-sm">{data?.instructor?.name}</p>
                    <p className="text-sm">{data?.instructor?.email}</p>
                  </div>

                  <div className="flex flex-col gap-6 items-center flex-1">
                    <p className="flex-1 text-justify text-sm tracking-wide">
                      {data?.description}
                    </p>

                    <Button.Root>
                      <Button.Content title={"ADICIONAR AO CARRINHO"} />
                    </Button.Root>
                  </div>
                </div>
              </div>
            ) : (
              <CourseContentSkeleton />
            )}
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
            />
          )}
        </div>
      </div>
    </PageRoot>
  );
}
