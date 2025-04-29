"use client";
import { PageRoot } from "@/components/layout/PageRoot";
import { CarouselContainer } from "@/components/presentation/carousel/CarouselContainer";
import { Footer } from "@/components/presentation/footer/footer";
import { HeroSection } from "@/components/presentation/hero-section/hero-section";
import { useCurrentUser } from "@/main/hooks/users/use-current-user";

export default function HomePage() {
  const user = useCurrentUser();
  return (
    <PageRoot>
      <div className="flex flex-1 flex-col items-center gap-8 mb-12">
        <HeroSection />

        <CarouselContainer />
      </div>
      <Footer />
    </PageRoot>
  );
}
