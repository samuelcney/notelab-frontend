import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "../badges/Badge";
import { CourseProps } from "@/types/types";

export const CourseCatalogCard = ({ ...course }: CourseProps) => {
  const navigation = useRouter();

  return (
    <div
      className="w-full h-[300px] border flex shadow-md rounded-md overflow-hidden gap-4 cursor-pointer hover:shadow-lg transition-all duration-200"
      key={course.id}
      onClick={() => navigation.push(`course/${course.id}`)}
    >
      <div className="w-[22em] relative overflow-hidden">
        <Badge.Level level={course.difficulty} isFromCard isLeft />
        <Image
          src={"/images/background/image1.jpg"}
          alt={`Banner - ${course.name}`}
          width={1000}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="py-2 flex flex-col w-full pr-4 justify-between">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-semibold mt-2">{course.name}</h1>

          <p className="text-greenApp font-semibold text-xl">
            R$ {course.price.toFixed(2)}
          </p>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2">
          {course.categories.map((item) => (
            <Badge.Category
              categoryName={item.category.name}
              key={item.category.id}
            />
          ))}
        </div>

        <div className="mt-6 w-[85%] flex gap-1 ">
          <p className="font-semibold text-sm">Descrição:</p>
          <p className="line-clamp-5 break-words text-sm text-justify">
            {course.description}
          </p>
        </div>

        <div className="flex mt-8 flex-wrap gap-1">
          <p className="text-sm font-semibold">Instrutor:</p>
          <p className="text-sm">{course.instructor.name}</p>
        </div>
      </div>
    </div>
  );
};
