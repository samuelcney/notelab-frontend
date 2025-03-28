import { moduleService } from "@/main/services/modules/modulesService";
import { Modules } from "@/types/CourseInterface";
import { useQuery } from "@tanstack/react-query";

export const useGetModuleById = (id: number) => {
  return useQuery<Modules>({
    queryKey: ["module", id],
    queryFn: () => moduleService.getModuleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
