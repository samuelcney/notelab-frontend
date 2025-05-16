"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/presentation/ui/carousel";
import { CourseProps } from "@/types/types";
import { CourseCard } from "../course-card/CourseCard";
import { CourseCardSkeleton } from "../course-card/CourseCardSkeleton";
import { CarouselTitle } from "./CarouselTitle";

interface CourseCarouselProps {
  title: string;
  coursesList: CourseProps[];
  loading: boolean;
  isFreeCourses?: boolean;
}

export const CarouselRoot = ({
  title,
  coursesList,
  loading,
  isFreeCourses = false,
}: CourseCarouselProps) => {
  const courses = isFreeCourses
    ? coursesList.filter((course) => course.price === 0)
    : coursesList.filter((course) => course.price > 0);

  return (
    <div className="flex flex-1 flex-col gap-2 px-8 w-full">
      <CarouselTitle title={title} />
      {!loading && courses.length === 0 ? (
        <div className="pl-4 text-lg text-gray-500 w-full h-[100px]">
          No momento não há cursos disponíveis.
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
              : courses.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="flex-shrink-0 flex-grow-0 basis-full max-sm:basis-1/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/5"
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
