import { lessonService } from "@/main/services/lessons/lesson-service";
import { Lessons } from "@/types/types";

import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonsByModuleId = (moduleId: string) => {
  return useQuery<Lessons[]>({
    queryKey: [QueryKeysEnum.GET_LESSONS_BY_MODULE_ID, moduleId],
    queryFn: () => lessonService.getLessonsByModuleId(moduleId),
    enabled: !!moduleId,
    staleTime: 1000 * 60 * 5,
  });
};
