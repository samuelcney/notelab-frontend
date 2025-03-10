"use client";
import { CourseHeaderSkeleton } from "@/components/CoursePage/CourseHeaderSkeleton";
import { PageRoot } from "@/components/layout/PageRoot";
import { useCourseById } from "@/hooks/courses/useCourseById";
import { categoryColors } from "@/utils/categoryColors";
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
        <div className="flex flex-1 w-full items-center max-md:flex-col">
          <div className="flex w-[70%] p-2 h-full">
            {!isPending ? (
              <div className="flex max-h-9 items-center gap-4 p-2">
                <h1 className="font-semibold text-3xl">{data?.name}</h1>
                <span className="w-[1px] h-full bg-foreground" />
                <div className="flex gap-2">
                  {data?.categories.map((item) => (
                    <p
                      key={item.categoryId}
                      className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold"
                      style={{
                        backgroundColor: categoryColors[item.category.name],
                      }}
                    >
                      {item.category.name.toUpperCase()}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <CourseHeaderSkeleton />
            )}
          </div>
          <span className="h-[90%] w-[1px] bg-light-gray" />
          <div className="flex w-[30%]"></div>
        </div>
      </div>
    </PageRoot>
  );
}
