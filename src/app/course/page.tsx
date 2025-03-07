import { PageRoot } from "@/components/layout/PageRoot";
import Image from "next/image";

export const metadata = {
  title: "Notelab - Curso",
};

export default function CoursePage() {
  return (
    <PageRoot>
      <div className="flex flex-1 flex-col items-center">
        <div className="w-full h-72">
          <Image
            src={"/images/background/image1.jpg"}
            alt="Banner"
            width={1350}
            height={300}
            className="object-cover w-full h-full aspect-square"
          />
        </div>
        <div className="flex flex-1 w-full items-center">
          <div className="flex w-[70%] p-2"></div>
          <span className="h-[90%] w-[1px] bg-light-gray" />
          <div className="flex w-[30%]"></div>
        </div>
      </div>
    </PageRoot>
  );
}
