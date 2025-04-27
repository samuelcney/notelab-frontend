"use client";

import { Category } from "@/types/types";
import { translateDifficulty } from "@/utils/Translations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "../badges/Badge";

interface CourseCardProps {
  id: number;
  courseName: string;
  price: number;
  difficulty: string;
  instructorName: string;
  categories: Category[];
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
      onClick={() => navigation.push(`course/${id}`)}
      key={id}
    >
      <div className="w-full relative overflow-hidden">
        <Badge.Level level={difficulty} isFromCard />
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
            <Badge.Category categoryName={item.name} key={item.id} />
          ))}
        </div>

        <div className="mt-2">
          <p className="text-greenApp font-semibold">R$ {price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
