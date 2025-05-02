"use client";

import { BACKGROUND_IMAGE_PATHS } from "@/utils/Constants";
import { shuffleArray } from "@/utils/Functions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ImageSlideshow() {
  const [index, setIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(BACKGROUND_IMAGE_PATHS));
  }, []);

  useEffect(() => {
    shuffledImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => [...prev, src]);
      };
    });
  }, [shuffledImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      <AnimatePresence>
        {loadedImages.includes(shuffledImages[index]) && (
          <motion.img
            key={shuffledImages[index]}
            src={shuffledImages[index]}
            alt="Slideshow"
            className="absolute inset-0 w-full h-full object-cover bg-background aspect-squares"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
