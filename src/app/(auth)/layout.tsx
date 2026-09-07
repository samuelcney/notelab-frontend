"use client";

import ImageSlideshow from "@/presentation/components/image-slide-show/ImageSlideShow";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRegisterPath = pathname.includes("register");

  return (
    <div
      className={`w-full flex max-md:flex-col ${
        isRegisterPath ? "flex-row-reverse" : "flex-row"
      } h-dvh relative`}
    >
      <div
        className={`flex flex-[0.5] ${
          isRegisterPath
            ? "max-sm:hidden max-md:max-h-[30%]"
            : "max-sm:max-h-[20%] max-md:max-h-[30%]"
        } h-full`}
      >
        <ImageSlideshow />
      </div>
      <div
        className={`flex-[0.5] h-full bg-background flex items-center justify-center max-sm:pt-5 ${
          isRegisterPath && "max-sm:flex-1"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
