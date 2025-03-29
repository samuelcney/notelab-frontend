import { notify } from "@/components/presentation/toast/Toast";
import { userService } from "@/main/services/users/userService";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeysEnum.CREATE_USER] });
      notify("Usuário criado com sucesso", "success");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
