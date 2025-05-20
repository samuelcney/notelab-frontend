import { courseService } from "@/main/services/courses/course-service";
import { CourseProps } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseById = (id: string) => {
  return useQuery<CourseProps>({
    queryKey: [QueryKeysEnum.GET_COURSE_BY_ID, id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
