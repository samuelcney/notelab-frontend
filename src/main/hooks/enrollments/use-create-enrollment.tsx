import { enrollmentService } from "@/main/services/enrollments/enrollmentService";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../auth/use-current-user";

export const useCreateEnrollment = () => {
  const context = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollmentService.createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.CREATE_COURSE, context?.id],
      });

      notify("Matrícula feita com sucesso!", "success");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", errorMessage);
      notify(errorMessage, "error");
    },
  });
};
