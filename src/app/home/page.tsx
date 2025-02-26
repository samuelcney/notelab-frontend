import { Carousel } from "@/components/Carousel";
import { CourseCard } from "@/components/CourseCard/CourseCard";
import { Header } from "@/components/Header";
import { Avatar } from "@/components/Profile/Avatar";

export default function HomePage() {
  const courses = Array(8).fill(null);
  return (
    <div className="flex flex-1 h-screen flex-col w-screnn">
      <Header.Root>
        <Header.Content />
      </Header.Root>

      <div className="w-full flex flex-1 flex-col items-center">
        <div className="w-[86%] flex pt-7 flex-col">
          <div className="flex w-full gap-4 relative">
            <Avatar abbreviation="SC" isBigSize />
            <h1 className="flex text-2xl font-medium items-center tracking-wide">
              Bem vindo(a) de volta, Samuel Costa
            </h1>
          </div>

          <div className="w-full flex flex-col gap-14 mt-12">
            <Carousel.Root>
              <Carousel.Title title="Para você" />
              <Carousel.List>
                {courses.map((_, index) => (
                  <CourseCard key={index} />
                ))}
              </Carousel.List>
            </Carousel.Root>

            <Carousel.Root>
              <Carousel.Title title="Confira os cursos em destaque" />
              <Carousel.List>
                {courses.map((_, index) => (
                  <CourseCard key={index} />
                ))}
              </Carousel.List>
            </Carousel.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
