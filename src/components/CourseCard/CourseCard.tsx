"use client";

import { Category2 } from "@/types/CourseInterface";
import { categoryColors } from "@/utils/categoryColors";
import { translateDifficulty } from "@/utils/translateDifficulty";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: number;
  courseName: string;
  price: number;
  difficulty: string;
  instructorName: string;
  categories: Category2[];
}

export const CourseCard = ({
  id,
  courseName,
  price,
  difficulty,
  instructorName,
  categories,
}: CourseCardProps) => {
  const navigation = useRouter();

  const { name: levelName, color: levelColor } =
    translateDifficulty(difficulty);

  return (
    <div
      className="border border-light-gray w-full h-auto rounded-lg cursor-pointer aspect-square flex-col overflow-hidden"
      onClick={() => navigation.push("/course")}
      key={id}
    >
      <div className="w-full h-full flex flex-col items-center justify-end">
        <div className="w-full flex h-1/2 justify-end flex-col relative overflow-hidden">
          <p
            className={`font-semibold text-sm absolute top-2 right-2 text-white px-2 py-1 rounded-md shadow-md z-10`}
            style={{ backgroundColor: levelColor }}
          >
            {levelName}
          </p>
          <Image
            src={"/images/background/image1.jpg"}
            alt={`Banner - ${courseName}`}
            width={1000}
            height={300}
            className="object-cover w-full h-full aspect-square hover:scale-[1.04] transition-all"
          />
        </div>
        <div className="w-full flex h-1/2 p-2 justify-between flex-col">
          <div className="flex flex-col gap-[0.5px]">
            <p className="text-lg">{courseName}</p>
            <p className="text-xs text-light-gray pl-1">
              {instructorName ? instructorName : "---"}
            </p>
          </div>
          <div className="flex overflow-x-auto gap-2">
            {categories.map((item) => (
              <p
                key={item.id}
                className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold"
                style={{ backgroundColor: categoryColors[item.name] }}
              >
                {item.name.toUpperCase()}
              </p>
            ))}
          </div>
          <div>
            <p className="text-greenApp font-semibold">R$ {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
