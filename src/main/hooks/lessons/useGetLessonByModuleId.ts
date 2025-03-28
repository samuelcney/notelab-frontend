import { lessonService } from "@/main/services/lessons/lessonService";
import { Lessons } from "@/types/CourseInterface";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonsByModuleId = (moduleId: number) => {
  return useQuery<Lessons[]>({
    queryKey: ["lessonByModule", moduleId],
    queryFn: () => lessonService.getLessonsByModuleId(moduleId),
    enabled: !!moduleId,
    staleTime: 1000 * 60 * 5,
  });
};
