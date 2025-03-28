"use client";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/presentation/avatar-profile/AvatarBallComponent";
import { CarouselContainer } from "@/components/presentation/carousel/CarouselContainer";

export default function HomePage() {
  return (
    <PageRoot>
      <div className="flex flex-1 flex-col mt-14 items-center">
        <div className="flex gap-4 mb-14 w-full pl-8">
          <AvatarBallComponent abbreviation="SC" isBigSize />
          <h1 className="text-2xl font-semibold flex items-center tracking-wide">
            Bem vindo(a) de volta, Samuel Costa
          </h1>
        </div>

        <CarouselContainer />
      </div>
    </PageRoot>
  );
}
