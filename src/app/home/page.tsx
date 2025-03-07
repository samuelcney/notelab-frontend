import { CourseCarousel } from "@/components/Carousel/CourseCarouselRoot";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/Profile/AvatarBallComponent";

export const metadata = {
  title: "Notelab - Início",
};

export default function HomePage() {
  const courses = Array(12).fill(null);
  return (
    <PageRoot>
      <div className="flex flex-1 flex-col mt-14 items-center">
        <div className="flex gap-4 mb-14 w-full pl-8">
          <AvatarBallComponent abbreviation="SC" isBigSize />
          <h1 className="text-2xl font-semibold flex items-center tracking-wide">
            Bem vindo(a) de volta, Samuel Costa
          </h1>
        </div>

        <div className="flex flex-1 h-full flex-col gap-12 w-[90%]">
          <CourseCarousel title="Para você" itemsArray={courses} />

          <CourseCarousel
            title="Confira os cursos em destaque"
            itemsArray={courses}
          />
        </div>
      </div>
    </PageRoot>
  );
}
