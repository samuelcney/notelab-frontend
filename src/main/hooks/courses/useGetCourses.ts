import { courseService } from "@/main/services/courses/courseService";
import { CourseProps } from "@/types/CourseInterface";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  const data = useQuery<CourseProps[]>({
    queryKey: [queryKeysEnum.GET_COURSES],
    queryFn: courseService.getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
