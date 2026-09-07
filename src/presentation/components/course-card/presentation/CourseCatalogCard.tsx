import { useGetUserById } from "@/main/hooks/users/use-get-user-by-id";
import { CourseProps } from "@/types/types";
import { BACKGROUND_IMAGE_PATHS } from "@/utils/Constants";
import { getRandomItem } from "@/utils/Functions";
import { useRouter } from "next/navigation";
import { Badge } from "../../badges/Badge";

export const CourseCatalogCard = ({ ...course }: Partial<CourseProps>) => {
  const navigation = useRouter();

  const randomImagePath = getRandomItem(BACKGROUND_IMAGE_PATHS);

  const { data: instructor } = useGetUserById(
    course.instructorId || course.instructor?.id || ""
  );

  return (
    <div
      className="w-full min-h-[300px] md:h-[300px] border border-border flex flex-col md:flex-row shadow-md rounded-md overflow-hidden gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      key={course.id}
      onClick={() => navigation.push(`course/${course.id}/presentation`)}
    >
      <div className="w-full md:w-[22em] h-[200px] md:h-full relative overflow-hidden">
        <Badge.Level level={course.difficulty ?? ""} isFromCard isLeft />
        <img
          src={course?.coverImage || randomImagePath}
          alt={`Banner - ${course.name}`}
          width={300}
          height={300}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="py-2 flex flex-col w-full pr-4 justify-between pl-2">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <h1 className="text-xl font-semibold mt-2">{course.name}</h1>

          <p className="text-greenApp font-semibold text-xl">
            R$ {course.price?.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 max-h-[6rem] overflow-auto">
          {course.categories?.map((item) => (
            <Badge.Category categoryName={item.name} key={item.id} />
          ))}
        </div>

        <div className="mt-6 w-full flex gap-1">
          <p className="font-semibold text-sm shrink-0">Descrição:</p>
          <p className="line-clamp-4 break-words text-sm text-justify text-muted-foreground">
            {course.description}
          </p>
        </div>

        <div className="flex mt-8 flex-wrap gap-1">
          <p className="text-sm font-semibold">Instrutor:</p>
          <p className="text-sm">{instructor?.name}</p>
        </div>
      </div>
    </div>
  );
};
