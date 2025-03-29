import { courseService } from "@/main/services/courses/courseService";
import { CourseProps } from "@/types/CourseInterface";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useCourseById = (id: number) => {
  return useQuery<CourseProps>({
    queryKey: [queryKeysEnum.GET_COURSE_BY_ID, id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
