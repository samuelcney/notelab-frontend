import { courseService } from "@/main/services/courses/course-service";
import { CourseProps } from "@/types/types";
import { queryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseById = (id: number) => {
  return useQuery<CourseProps>({
    queryKey: [queryKeysEnum.GET_COURSE_BY_ID, id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
