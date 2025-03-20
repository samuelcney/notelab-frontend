import { courseService } from "@/main/services/courses/courseService";
import { CourseProps } from "@/types/CourseInterface";
import { useQuery } from "@tanstack/react-query";

export const useCourseById = (id: number) => {
  return useQuery<CourseProps>({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
