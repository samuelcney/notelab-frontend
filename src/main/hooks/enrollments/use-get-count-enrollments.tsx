import { enrollmentService } from "@/main/services/enrollments/enrollmentService";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCountEnrollments = (id: string) => {
  return useQuery<number>({
    queryKey: [QueryKeysEnum.GET_COUNT_ENROLLMENTS, id],
    queryFn: () => enrollmentService.getCountEnrollments(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
