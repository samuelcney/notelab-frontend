"use client";
import { Badge } from "@/components/Badges/Badge";
import { ChapterAccordion } from "@/components/Chapters/ChapterAccordion";
import { ChapterAccordionSkeleton } from "@/components/Chapters/ChapterAccordionSkeleton";
import { CourseContentSkeleton } from "@/components/CoursePage/CourseContentSkeleton";
import { CourseHeaderSkeleton } from "@/components/CoursePage/CourseHeaderSkeleton";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/Profile/AvatarBallComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourseById } from "@/hooks/courses/useCourseById";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const { courseId } = useParams();

  const { data, isPending } = useCourseById(Number(courseId));

  return (
    <PageRoot isOverflowHidden>
      <div className="flex flex-1 w-full items-center h-full overflow-hidden">
        <div className="flex w-[70%] flex-col overflow-y-auto h-full">
          <div className="w-full">
            {!isPending ? (
              <Image
                src={"/images/background/image1.jpg"}
                alt="Banner"
                width={1350}
                height={300}
                className="object-cover w-full h-72 aspect-square "
              />
            ) : (
              <Skeleton className="w-full h-72" />
            )}
          </div>
          <div className="p-3 w-full">
            <div className="flex items-center gap-4 p-2 min-h-[100px]">
              {!isPending ? (
                <>
                  <h1 className="font-semibold text-3xl leading-tight">
                    {data?.name}
                  </h1>
                  <span className="w-[1px] h-6 bg-foreground" />
                  <div className="flex gap-2">
                    {data?.categories.map((item) => (
                      <Badge.Category
                        key={item.categoryId}
                        categoryName={item.category.name}
                      />
                    ))}
                  </div>
                  <span className="w-[1px] h-6 bg-foreground" />
                  <Badge.Level level={data?.difficulty ?? ""} />
                </>
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
                    />
                    <p className="text-sm">{data?.instructor?.name}</p>
                    <p className="text-sm">{data?.instructor?.email}</p>
                  </div>

                  <p className="flex-1 text-justify text-sm">
                    {data?.description}
                  </p>
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
