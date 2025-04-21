import { courseService } from "@/main/services/courses/course-service";
import { CourseProps } from "@/types/types";

import { queryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = () => {
  const data = useQuery<CourseProps[]>({
    queryKey: [queryKeysEnum.GET_COURSES],
    queryFn: courseService.getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
