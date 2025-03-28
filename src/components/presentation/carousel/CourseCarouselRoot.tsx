"use client";

import { CourseCardSkeleton } from "@/components/presentation/course-card/CourseCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselTitle } from "./CarouselTitle";
import { CourseCard } from "../course-card/CourseCard";
import { CourseProps } from "@/types/CourseInterface";

interface CourseCarouselProps {
  title: string;
  coursesList: CourseProps[];
  loading: boolean;
}

export const CourseCarousel = ({
  title,
  coursesList,
  loading,
}: CourseCarouselProps) => {
  return (
    <div className="flex flex-1 flex-col gap-2 px-8 w-full">
      <CarouselTitle title={title} />
      {coursesList.length === 0 && !loading ? (
        <div className="text-center text-lg text-gray-500 w-full">
          Nenhum curso encontrado. Volte mais tarde!
        </div>
      ) : (
        <Carousel className="">
          <CarouselContent className="flex gap-2">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
                    >
                      <CourseCardSkeleton />
                    </CarouselItem>
                  ))
              : coursesList?.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <CourseCard
                      id={course.id}
                      courseName={course.name}
                      price={course.price}
                      categories={
                        course.categories?.map(({ category }) => category) ?? []
                      }
                      instructorName={course.instructor.name}
                      difficulty={course.difficulty}
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
