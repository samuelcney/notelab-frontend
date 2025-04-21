import { useGetCourses } from "@/main/hooks/courses/use-get-courses";
import { CarouselRoot } from "./CourseCarouselRoot";
import { CourseProps } from "@/types/types";

export const CarouselContainer = () => {
  const { data: courses, isPending } = useGetCourses();

  const carouselsConfig = [
    { title: "Mais recentes:", transform: (list: CourseProps[]) => list },
    {
      title: "Confira os cursos em alta:",
      transform: (list: CourseProps[]) => [...list].reverse(),
    },
    {
      title: "Cursos gratuitos para você aproveitar!",
      transform: (list: CourseProps[]) => list,
      isFreeCourses: true,
    },
  ];

  return (
    <div className="flex flex-1 h-full flex-col gap-20 w-[100vw] px-4 mb-10">
      {carouselsConfig.map((carousel, index) => (
        <CarouselRoot
          key={index}
          title={carousel.title}
          coursesList={carousel.transform(courses || [])}
          loading={isPending}
          isFreeCourses={carousel.isFreeCourses}
        />
      ))}
    </div>
  );
};
