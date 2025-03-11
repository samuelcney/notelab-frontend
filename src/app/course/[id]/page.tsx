"use client";
import { Badge } from "@/components/Badges/Badge";
import { ChapterAccordion } from "@/components/Chapters/ChapterAccordion";
import { ChapterAccordionSkeleton } from "@/components/Chapters/ChapterAccordionSkeleton";
import { CourseHeaderSkeleton } from "@/components/CoursePage/CourseHeaderSkeleton";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/Profile/AvatarBallComponent";
import { useCourseById } from "@/hooks/courses/useCourseById";
import { categoryColors } from "@/utils/categoryColors";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const { id } = useParams();

  const { data, isPending } = useCourseById(Number(id));

  return (
    <PageRoot>
      <div className="flex flex-1 flex-col items-center">
        <div className="w-full h-72">
          <Image
            src={"/images/background/image1.jpg"}
            alt="Banner"
            width={1350}
            height={300}
            className="object-cover w-full h-full aspect-square"
          />
        </div>
        <div className="flex flex-1 w-full items-center max-md:flex-col p-2">
          <div className="flex w-[70%] p-2 h-full flex-col">
            {!isPending ? (
              <div className="flex max-h-9 items-center gap-4 p-2">
                <h1 className="font-semibold text-3xl">{data?.name}</h1>
                <span className="w-[1px] h-full bg-foreground" />
                <div className="flex gap-2">
                  {data?.categories.map((item) => (
                    <Badge.Category
                      key={item.categoryId}
                      categoryName={item.category.name}
                    />
                  ))}
                </div>
                <span className="w-[1px] h-full bg-foreground" />
                <Badge.Level level={data?.difficulty ?? ""} />
              </div>
            ) : (
              <CourseHeaderSkeleton />
            )}

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
          </div>
          <span className="h-[90%] w-[1px] bg-light-gray" />

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
