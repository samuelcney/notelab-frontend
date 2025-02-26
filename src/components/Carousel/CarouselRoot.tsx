import { ReactNode } from "react";

interface CarouselRootProps {
  children: ReactNode;
}

export const CarouselRoot = ({ children }: CarouselRootProps) => {
  return <div className="flex flex-col w-full gap-3">{children}</div>;
};
