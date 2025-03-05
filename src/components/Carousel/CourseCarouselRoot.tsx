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
  itemsArray: any[];
}

export const CourseCarousel = ({ title, itemsArray }: CourseCarouselProps) => {
  return (
    <div className="flex flex-1 flex-col gap-2 px-8">
      <CarouselTitle title={title} />
      <Carousel>
        <CarouselContent className="">
          {itemsArray.map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="">
                <CourseCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
