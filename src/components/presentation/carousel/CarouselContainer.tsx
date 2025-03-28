import { useCourses } from "@/main/hooks/courses/useGetCourses";
import { CarouselRoot } from "./CourseCarouselRoot";

export const CarouselContainer = () => {
  const { data: courses, isPending } = useCourses();
  return (
    <div className="flex flex-1 h-full flex-col gap-20 w-[100vw] px-4 mb-10">
      <CarouselRoot
        title="Mais recentes:"
        coursesList={courses ? [...courses] : []}
        loading={isPending}
      />

      <CarouselRoot
        title="Confira os cursos em alta:"
        coursesList={courses ? [...courses].reverse() : []}
        loading={isPending}
      />

      <CarouselRoot
        title="Cursos gratuitos para você aproveitar!"
        coursesList={courses ? courses : []}
        loading={isPending}
      />
    </div>
  );
};
