import ImageSlideshow from "@/components/ImageSlideshow/ImageSlideShow";
import { Guitar } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-row h-screen relative">
      <div className="w-1/2 relative">
        <ImageSlideshow />
      </div>
      <div className="w-1/2 h-full bg-foreground flex items-center justify-center">
        <h1 className="text-black text-2xl"></h1>
      </div>
    </div>
  );
}
