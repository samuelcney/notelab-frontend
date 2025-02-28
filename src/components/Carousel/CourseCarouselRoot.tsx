import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselTitle } from "./CarouselTitle";
import { ReactNode } from "react";
import { CourseCard } from "../CourseCard/CourseCard";

interface CourseCarouselProps {
  title: string;
  itemsArray: any[];
}

export const CourseCarousel = ({ title, itemsArray }: CourseCarouselProps) => {
  return (
    <Carousel className="flex max-w-[1350px] flex-col">
      <CarouselTitle title={title} />
      <CarouselContent className="w-full">
        {itemsArray.map((_, index) => (
          <CarouselItem key={index} className="basis-[25%]">
            <div className="p-1">
              <CourseCard />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
