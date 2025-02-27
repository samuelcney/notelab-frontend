"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ArrowButton } from "../ArrowButton";

interface CarouselRootProps {
  children: ReactNode;
}

export const CarouselList = ({ children }: CarouselRootProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = 400;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateArrows);
    updateArrows();

    return () => container.removeEventListener("scroll", updateArrows);
  }, []);

  return (
    <div className="w-full flex items-center relative">
      {showLeftArrow && (
        <ArrowButton direction="left" onclick={() => scroll("left")} />
      )}

      <div
        ref={carouselRef}
        className="w-full overflow-hidden pb-2 flex"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#a8a8a8 transparent",
          scrollBehavior: "smooth",
        }}
      >
        <div className="inline-flex gap-6">{children}</div>
      </div>
      {showRightArrow && (
        <ArrowButton direction="right" onclick={() => scroll("right")} />
      )}
    </div>
  );
};
