import { lessonService } from "@/main/services/lessons/lessonService";
import { Lessons } from "@/types/CourseInterface";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonsByModuleId = (moduleId: number) => {
  return useQuery<Lessons[]>({
    queryKey: [queryKeysEnum.GET_LESSONS_BY_MODULE_ID, moduleId],
    queryFn: () => lessonService.getLessonsByModuleId(moduleId),
    enabled: !!moduleId,
    staleTime: 1000 * 60 * 5,
  });
};
