import { courseService } from "@/main/services/courses/course-service";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../auth/use-current-user";

export const useCreateCourse = () => {
  const context = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.CREATE_COURSE, context?.id],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_COURSES, context?.id],
      });

      notify("Curso criado com sucesso", "success");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", errorMessage);
      notify(errorMessage, "error");
    },
  });
};
