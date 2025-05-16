"use client";

import { CarouselContainer } from "@/presentation/components/carousel/CarouselContainer";
import { Footer } from "@/presentation/components/footer/footer";
import { HeroSection } from "@/presentation/components/hero-section/hero-section";
import { PageRoot } from "@/presentation/layout/PageRoot";

export default function HomePage() {
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
