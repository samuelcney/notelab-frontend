import { useGetCourses } from "@/main/hooks/courses/use-get-courses";
import { CourseProps } from "@/types/types";
import { CarouselRoot } from "./CourseCarouselRoot";

export const CarouselContainer = () => {
  const { data: courses, isPending } = useGetCourses();

  const carouselsConfig = [
    {
      title: "Mais recentes:",
      transform: (list: CourseProps[]) => list,
    },
    {
      title: "Confira os cursos em alta:",
      transform: (list: CourseProps[]) => [...list].reverse(),
    },
  ];

  return (
    /* w-full, não w-[100vw]: 100vw inclui a largura da scrollbar e ignora a
       sidebar, o que empurrava o conteúdo para fora e obrigava o PageRoot a
       esconder o overflow horizontal. */
    <div className="flex flex-1 h-full w-full flex-col gap-12 md:gap-20 px-4 mb-10">
      {carouselsConfig.map((carousel, index) => (
        <CarouselRoot
          key={index}
          title={carousel.title}
          coursesList={carousel.transform(courses || [])}
          loading={isPending}
        />
      ))}
    </div>
  );
};
