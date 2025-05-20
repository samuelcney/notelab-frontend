import { Badge } from "@/presentation/components/badges/Badge";
import { CourseHeaderSkeleton } from "@/presentation/components/course-details/CourseHeaderSkeleton";
import { CourseProps } from "@/types/types";

interface Props {
  data: CourseProps;
  isPending: boolean;
}

export const CourseHeader = ({ isPending, data }: Props) => {
  if (isPending) return <CourseHeaderSkeleton />;

  return (
    <div className="flex items-center gap-4 p-2 min-h-[100px]">
      <div className="flex flex-row gap-6 w-full justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-3xl leading-tight">{data?.name}</h1>
          <h2 className="text-greenApp text-xl">R$ {data?.price}</h2>
        </div>

        <div className="flex flex-row h-6 gap-2 mt-2">
          <div className="flex gap-2">
            {data?.categories.map((item) => (
              <Badge.Category
                key={item.category.id}
                categoryName={item.category.name}
              />
            ))}
          </div>
          <span className="w-[1px] h-full bg-foreground" />
          <Badge.Level level={data?.difficulty ?? ""} />
        </div>
      </div>
    </div>
  );
};
