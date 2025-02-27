import { Carousel } from "@/components/Carousel";
import { CourseCard } from "@/components/CourseCard/CourseCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Avatar } from "@/components/Profile/Avatar";

export default function HomePage() {
  const courses = Array(8).fill(null);
  return (
    <div className="flex flex-1 h-auto flex-col w-full">
      <Header.Root>
        <Header.Content />
      </Header.Root>

      <div className="w-full flex flex-1 flex-col items-center justify-center">
        <div className="w-full flex mt-12 flex-col">
          <div className="flex mx-32 gap-4">
            <Avatar abbreviation="SC" isBigSize />
            <h1 className="flex text-2xl font-medium items-center tracking-wide">
              Bem vindo(a) de volta, Samuel Costa
            </h1>
          </div>

          <div className="mx-32 w-auto flex flex-col gap-14 mt-12">
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
        <Footer.Root />
      </div>
    </div>
  );
}
