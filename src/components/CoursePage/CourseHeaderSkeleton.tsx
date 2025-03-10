import { Skeleton } from "../ui/skeleton";

export const CourseHeaderSkeleton = () => {
  return (
    <div className="flex max-h-9 items-center gap-4 p-2">
      <Skeleton className="h-8 w-[400px]" />

      <span className="w-[1px] h-full bg-foreground/20" />

      <div className="flex gap-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>

      <span className="w-[1px] h-full bg-foreground/20" />

      <div className="flex gap-2">
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );
};
