"use client";

import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  name: string;
  price: number;
  difficulty: string;
  instructorId: number;
  categories: Category[];
}

export const CourseCard = ({
  id,
  name,
  price,
  difficulty,
  instructorId,
  categories,
}: CourseCardProps) => {
  const navigation = useRouter();
  return (
    <div
      className="border border-light-gray w-full h-auto rounded-lg cursor-pointer aspect-square p-2 flex-col"
      onClick={() => navigation.push("/course")}
    >
      <div className="w-full h-full flex flex-col items-center justify-end">
        <div className="w-full flex h-1/2 border-b"></div>
        <div className="w-full flex h-1/2 justify-between items-end">
          <p className="">{name}</p>
          <p className="text-greenApp font-semibold">R$ {price}</p>
        </div>
      </div>
    </div>
  );
};
