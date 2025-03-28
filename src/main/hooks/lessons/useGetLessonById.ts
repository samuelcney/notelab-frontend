import { lessonService } from "@/main/services/lessons/lessonService";
import { Lessons } from "@/types/CourseInterface";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonById = (id: number) => {
  return useQuery<Lessons>({
    queryKey: ["lesson", id],
    queryFn: () => lessonService.getLessonById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
