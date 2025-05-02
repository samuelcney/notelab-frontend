"use client";

import { useGetCourses } from "@/main/hooks";
import { CourseCatalogCard } from "@/presentation/components/course-card/CourseCatalogCard";
import { CourseCatalogCardSkeleton } from "@/presentation/components/course-card/CourseCatalogCardSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";

export default function CatalogPage() {
  const { data: courses, isPending } = useGetCourses();
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="ml-24 mt-6 mb-14">
          <h1 className="text-4xl font-semibold tracking-wide">Catálogo</h1>
        </div>

        <div className="w-full items-center justify-center flex flex-1 gap-5 pb-12 max-sm:flex-col">
          <div className="flex h-full w-[20%] border border-foreground rounded-md flex-col gap-4 p-4">
            <h1 className="text-xl font-semibold">Filtros</h1>
          </div>
          <div className="w-[70%] h-full flex flex-col gap-8 justify-center items-center">
            <div className="w-full ml-9">
              <h1 className="text-3xl font-semibold">Todos os cursos</h1>
            </div>
            {courses?.map((course) =>
              !isPending ? (
                <CourseCatalogCard {...course} key={course.id} />
              ) : (
                Array(5)
                  .fill(0)
                  .map((_, index) => <CourseCatalogCardSkeleton key={index} />)
              )
            )}
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
