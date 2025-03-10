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
      className="border border-light-gray w-full rounded-lg cursor-pointer flex-col overflow-hidden aspect-[4/5] flex"
      onClick={() => navigation.push(`/course/${id}`)}
      key={id}
    >
      <div className="w-full h-1/2 relative">
        <p
          className="absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded-md shadow-md z-10"
          style={{ backgroundColor: levelColor }}
        >
          {levelName.toUpperCase()}
        </p>
        <Image
          src={"/images/background/image1.jpg"}
          alt={`Banner - ${courseName}`}
          width={1000}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="w-full flex flex-col justify-around flex-1 p-3">
        <div className="flex flex-col">
          <p className="text-lg font-semibold line-clamp-2 min-h-[3rem]">
            {courseName}
          </p>
          <p className="text-xs text-gray-500">{instructorName || "---"}</p>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2">
          {categories.map((item) => (
            <p
              key={item.id}
              className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold whitespace-nowrap"
              style={{ backgroundColor: categoryColors[item.name] }}
            >
              {item.name.toUpperCase()}
            </p>
          ))}
        </div>

        <div className="mt-2">
          <p className="text-greenApp font-semibold">R$ {price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
