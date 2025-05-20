import { courseService } from "@/main/services/courses/course-service";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.CREATE_COURSE],
      });

      notify("Curso criado com sucesso", "success");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", errorMessage);
      notify(errorMessage, "error");
    },
  });
};
