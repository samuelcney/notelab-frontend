"use client";
import { PageRoot } from "@/components/layout/PageRoot";
import { Badge } from "@/components/presentation/badges/Badge";
import { useCourses } from "@/main/hooks/courses/useGetCourses";
import Image from "next/image";

export default function CatalogPage() {
  const { data: courses } = useCourses();
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="ml-24 mt-6 mb-14">
          <h1 className="text-4xl font-semibold tracking-wide">Catálogo</h1>
        </div>

        <div className="w-full items-center justify-center flex flex-1 gap-3">
          <div className="flex h-full w-[20%] border border-greenApp rounded-md"></div>
          <div className="w-[70%] h-full flex flex-col gap-8 justify-center items-center">
            <div className="w-full ml-9">
              <h1 className="text-3xl font-semibold">Todos os cursos</h1>
            </div>
            {courses?.map((course) => (
              <div
                className="w-full h-[280px] border flex shadow-md rounded-md overflow-hidden gap-4"
                key={course.id}
              >
                <div className="w-[22em] relative overflow-hidden">
                  <Image
                    src={"/images/background/image1.jpg"}
                    alt={`Banner - ${course.name}`}
                    width={1000}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="py-2 flex flex-col w-full pr-4 justify-between">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-xl font-semibold mt-2">
                      {course.name}
                    </h1>

                    <p className="text-greenApp font-semibold text-xl">
                      R$ {course.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex overflow-x-auto gap-2 mt-2">
                    {course.categories.map((item) => (
                      <Badge.Category
                        categoryName={item.category.name}
                        key={item.category.id}
                      />
                    ))}
                  </div>

                  <div className="mt-6 w-[50%] flex gap-1 ">
                    <p className="font-semibold text-sm">Descrição:</p>
                    <p className="line-clamp-5 break-words text-sm">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex mt-8 flex-wrap gap-1">
                    <p className="text-sm font-semibold">Instrutor:</p>
                    <p className="text-sm">{course.instructor.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
