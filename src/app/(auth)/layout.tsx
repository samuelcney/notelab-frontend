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
      className={`w-full flex max-md:flex-col max-sm:justify-center ${
        isRegisterPath ? "flex-row-reverse" : "flex-row"
      } h-screen relative`}
    >
      <div className="flex flex-[0.5] relative max-md:max-h-[30%] max-sm:hidden">
        <ImageSlideshow />
      </div>
      <div className="flex-[0.5] h-full bg-background flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
