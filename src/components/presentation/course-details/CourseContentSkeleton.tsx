import { Skeleton } from "@/components/ui/skeleton";

export const CourseContentSkeleton = () => {
  return (
    <div className="flex mt-8 w-full justify-center px-8">
      <div className="flex w-full justify-between gap-20">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>

        <div className="flex-1 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    </div>
  );
};
