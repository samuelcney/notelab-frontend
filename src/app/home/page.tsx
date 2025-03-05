import { CourseCarousel } from "@/components/Carousel/CourseCarouselRoot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Avatar } from "@/components/Profile/Avatar";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function HomePage() {
  const courses = Array(12).fill(null);
  return (
    <div className="flex flex-1 h-screen flex-col">
      <Header.Root>
        <Header.Content />
      </Header.Root>
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex-1 flex h-full">
          <div className="flex flex-1 flex-col mt-14 items-center">
            <div className="flex gap-4 mb-14 w-full pl-8">
              <Avatar abbreviation="SC" isBigSize />
              <h1 className="text-2xl font-semibold flex items-center tracking-wide">
                Bem vindo(a) de volta, Samuel Costa
              </h1>
            </div>

            <div className="flex flex-1 h-full flex-col gap-12 w-full">
              <CourseCarousel title="Para você" itemsArray={courses} />

              <CourseCarousel
                title="Confira os cursos em destaque"
                itemsArray={courses}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer.Root />
    </div>
  );
}
