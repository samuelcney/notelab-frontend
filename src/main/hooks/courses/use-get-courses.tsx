import { courseService } from "@/main/services/courses/course-service";

import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = () => {
  const data = useQuery<any[]>({
    queryKey: [QueryKeysEnum.GET_COURSES],
    queryFn: courseService.getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
