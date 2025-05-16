import { courseService } from "@/main/services/courses/course-service";
import { CourseProps } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCoursesByInstructorId = (id: string) => {
  return useQuery<CourseProps[]>({
    queryKey: [QueryKeysEnum.GET_COURSES_BY_INSTRUCTOR, id],
    queryFn: () => courseService.getCourseByInstructorId(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
