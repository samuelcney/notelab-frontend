"use client";

import { Card, CardContent } from "@/presentation/ui/card";
import { Category } from "@/types/types";
import { BACKGROUND_IMAGE_PATHS } from "@/utils/Constants";
import { getRandomItem } from "@/utils/Functions";
import { useRouter } from "next/navigation";
import { Badge } from "../badges/Badge";

interface CourseCardProps {
  id: string;
  courseName: string;
  price?: number;
  difficulty: string;
  description?: string;
  instructorName: string;
  coverImage?: string;
  categories: Category[];
  isPresentation?: boolean;
}

export const CourseCard = ({
  id,
  courseName,
  difficulty,
  instructorName,
  categories,
  coverImage,
  description,
}: CourseCardProps) => {
  const navigation = useRouter();

  const randomImagePath = getRandomItem(BACKGROUND_IMAGE_PATHS);

  return (
    <Card
      className="border border-light-gray w-full rounded-lg cursor-pointer flex-col overflow-hidden flex aspect-[7/9] sm:aspect-[6/8] md:aspect-[5/7]"
      onClick={() => navigation.push(`course/${id}`)}
      key={id}
    >
      <div className="w-full relative overflow-hidden flex-[0.5]">
        <Badge.Level level={difficulty} isFromCard />
        <img
          src={coverImage ? coverImage : randomImagePath}
          alt={`Capa do curso ${courseName}`}
          width={200}
          height={200}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardContent className="pt-4 flex-[0.5] flex flex-col justify-between">
        <div className="w-full flex flex-col justify-around flex-1 p-1">
          <div className="flex flex-col">
            <p className="text-lg font-semibold line-clamp-2 min-h-[3rem] text-foreground">
              {courseName}
            </p>
            <p className="text-xs text-gray-500">{instructorName || "---"}</p>
          </div>

          <div className="flex overflow-x-auto gap-2 mt-3">
            {categories?.map((item) => (
              <Badge.Category key={item.id} categoryName={item.name} />
            ))}
          </div>

          {description && (
            <p className="text-sm text-foreground line-clamp-3 mt-4">
              - {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
