"use client";

import { Skeleton } from "@/presentation/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div className="w-full h-auto rounded-lg cursor-pointer flex-col overflow-hidden aspect-[4/5] flex border border-transparent">
      <div className="w-full h-1/2 relative">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="w-full flex flex-col justify-around flex-1 p-3">
        <div className="flex flex-col">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2 mt-1" />
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="mt-2">
          <Skeleton className="h-5 w-1/4" />
        </div>
      </div>
    </div>
  );
};
