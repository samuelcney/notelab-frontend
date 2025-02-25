"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imagePaths = [
  "/images/background/image1.jpg",
  "/images/background/image2.jpg",
  "/images/background/image3.jpg",
  "/images/background/image4.jpg",
];

export default function ImageSlideshow() {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => [...prev, src]);
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-foreground">
      <AnimatePresence>
        {loadedImages.includes(imagePaths[index]) && (
          <motion.img
            key={imagePaths[index]}
            src={imagePaths[index]}
            alt="Slideshow"
            className="absolute inset-0 w-full h-full object-cover bg-foreground aspect-squares"
            initial={{ opacity: 0 }}
            animate={{ opacity: 11 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
