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
  const { id } = useParams();

  const { data, isPending } = useCourseById(Number(id));

  return (
    <PageRoot>
      <div className="flex flex-1 flex-col items-center">
        <div className="flex flex-1 w-full items-center max-md:flex-col">
          <div className="flex w-[70%] h-full flex-col">
            <div className="w-full h-72">
              {!isPending ? (
                <Image
                  src={"/images/background/image1.jpg"}
                  alt="Banner"
                  width={1350}
                  height={300}
                  className="object-cover w-full h-full aspect-square"
                />
              ) : (
                <Skeleton className="w-full h-72" />
              )}
            </div>
            <div className="p-4 w-full h-full">
              <div className="flex max-h-9 items-center gap-4 p-2">
                {!isPending ? (
                  <>
                    <h1 className="font-semibold text-3xl">{data?.name}</h1>
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

                    <p className="flex-1 text-justify">{data?.description}</p>
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
              <ChapterAccordion chapterList={data?.modules ?? []} />
            )}
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
