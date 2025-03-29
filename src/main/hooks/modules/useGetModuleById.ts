import { moduleService } from "@/main/services/modules/modulesService";
import { Modules } from "@/types/CourseInterface";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetModuleById = (id: number) => {
  return useQuery<Modules>({
    queryKey: [queryKeysEnum.GET_MODULE_BY_ID, id],
    queryFn: () => moduleService.getModuleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
