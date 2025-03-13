"use client";
import { CourseCarousel } from "@/components/Carousel/CourseCarouselRoot";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/Avatar/AvatarBallComponent";
import { useCourses } from "@/hooks/courses/useCourses";

export default function HomePage() {
  const { data: courses, isPending } = useCourses();

  return (
    <PageRoot>
      <div className="flex flex-1 flex-col mt-14 items-center">
        <div className="flex gap-4 mb-14 w-full pl-8">
          <AvatarBallComponent abbreviation="SC" isBigSize />
          <h1 className="text-2xl font-semibold flex items-center tracking-wide">
            Bem vindo(a) de volta, Samuel Costa
          </h1>
        </div>

        <div className="flex flex-1 h-full flex-col gap-20 max-w-[100vw]">
          <CourseCarousel
            title="Mais recentes:"
            coursesList={courses ? [...courses].reverse() : []}
            loading={isPending}
          />

          <CourseCarousel
            title="Confira os cursos em alta:"
            coursesList={courses ? courses : []}
            loading={isPending}
          />

          <CourseCarousel
            title="Cursos gratuitos para você aproveitar!"
            coursesList={courses ? courses : []}
            loading={isPending}
          />
        </div>
      </div>
    </PageRoot>
  );
}
