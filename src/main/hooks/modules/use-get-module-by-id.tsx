import { moduleService } from "@/main/services/modules/modules-service";
import { Modules } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetModuleById = (id: number) => {
  return useQuery<Modules>({
    queryKey: [QueryKeysEnum.GET_MODULE_BY_ID, id],
    queryFn: () => moduleService.getModuleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
