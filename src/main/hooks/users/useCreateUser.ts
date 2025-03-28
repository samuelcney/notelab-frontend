import { notify } from "@/components/presentation/toast/Toast";
import { userService } from "@/main/services/users/userService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify("Usuário criado com sucesso", "success");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
