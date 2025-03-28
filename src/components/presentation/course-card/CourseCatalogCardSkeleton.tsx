import { Skeleton } from "@/components/ui/skeleton";

export const CourseCatalogCardSkeleton = () => {
  return (
    <div className="w-full h-[280px] border flex shadow-md rounded-md overflow-hidden gap-4 animate-pulse">
      <div className="w-[22em] bg-gray-600 h-full"></div>

      <div className="py-2 flex flex-col w-full pr-4 justify-between">
        <div className="w-full flex justify-between items-center">
          <div className="bg-gray-600 w-[200px] h-[30px] rounded-md"></div>
          <div className="bg-gray-600 w-[80px] h-[30px] rounded-md"></div>
        </div>

        <div className="flex overflow-x-auto gap-2 mt-2">
          <div className="bg-gray-600 w-[80px] h-[25px] rounded-md"></div>
          <div className="bg-gray-600 w-[80px] h-[25px] rounded-md"></div>
          <div className="bg-gray-600 w-[80px] h-[25px] rounded-md"></div>
        </div>

        <div className="mt-6 w-[90%] flex gap-1 ">
          <div className="bg-gray-600 w-[50%] h-[20px] rounded-md"></div>
        </div>

        <div className="flex mt-8 flex-wrap gap-1">
          <div className="bg-gray-600 w-[100px] h-[20px] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
