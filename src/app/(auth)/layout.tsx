"use client";
import ImageSlideshow from "@/components/presentation/image-slide-show/ImageSlideShow";
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
      className={`w-full flex ${
        isRegisterPath ? "flex-row-reverse" : "flex-row"
      } h-screen relative`}
    >
      <div className="flex flex-1 relative">
        <ImageSlideshow />
      </div>
      <div className="flex-1 h-full bg-background flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
