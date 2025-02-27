import { ReactNode } from "react";

interface CarouselRootProps {
  children: ReactNode;
}

export const CarouselList = ({ children }: CarouselRootProps) => {
  return (
    <div
      className="w-full overflow-x-auto pb-2"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#a8a8a8 transparent",
      }}
    >
      <div className="inline-flex gap-6">{children}</div>
    </div>
  );
};
