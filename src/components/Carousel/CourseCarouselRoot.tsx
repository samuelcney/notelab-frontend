import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselTitle } from "./CarouselTitle";
import { CourseCard } from "../CourseCard/CourseCard";

interface CourseCarouselProps {
  title: string;
  coursesList: CourseProps[];
}

export const CourseCarousel = ({ title, coursesList }: CourseCarouselProps) => {
  return (
    <div className="flex flex-1 flex-col gap-2 px-8">
      <CarouselTitle title={title} />
      <Carousel>
        <CarouselContent className="">
          {coursesList?.map((course) => (
            <CarouselItem
              key={course.id}
              className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CourseCard
                id={course.id}
                name={course.name}
                price={course.price}
                categories={course.categories}
                instructorId={course.instructorId}
                difficulty={course.difficulty}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
