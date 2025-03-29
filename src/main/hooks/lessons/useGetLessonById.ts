import { lessonService } from "@/main/services/lessons/lessonService";
import { Lessons } from "@/types/CourseInterface";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetLessonById = (id: number) => {
  return useQuery<Lessons>({
    queryKey: [queryKeysEnum.GET_LESSON_BY_ID, id],
    queryFn: () => lessonService.getLessonById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
