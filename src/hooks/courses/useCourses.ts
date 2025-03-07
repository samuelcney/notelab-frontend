import { courseService } from "@/services/courses/courseService";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  const data = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
