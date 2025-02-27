import { ReactNode } from "react";

interface CarouselRootProps {
  children: ReactNode;
}

export const CarouselRoot = ({ children }: CarouselRootProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {children}
    </div>
  );
};
