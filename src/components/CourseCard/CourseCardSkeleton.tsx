"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div className="w-full h-auto rounded-lg cursor-pointer aspect-square flex-col overflow-hidden border border-transparent">
      <div className="w-full h-full flex flex-col items-center justify-end">
        <div className="w-full flex h-1/2 justify-end flex-col relative">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-full flex h-1/2 p-2 justify-between flex-col">
          <div className="flex flex-col gap-[0.5px]">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2 mt-1" />
          </div>
          <div className="flex overflow-x-auto gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div>
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
