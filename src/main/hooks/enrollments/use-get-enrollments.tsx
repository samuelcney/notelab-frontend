import { enrollmentService } from "@/main/services/enrollments/enrollmentService";
import { EnrollmentData } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetEnrollmentsByUserId = (id: string) => {
  return useQuery<EnrollmentData[]>({
    queryKey: [QueryKeysEnum.GET_ENROLLMENT, id],
    queryFn: () => enrollmentService.getEnrollmentsByUserId(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
