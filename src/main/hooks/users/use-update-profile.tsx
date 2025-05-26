import { useAuth } from "@/main/context/auth";
import { userService } from "@/main/services/users/userService";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: userService.updateProfile,

    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.UPDATE_PROFILE],
      });

      updateUser(updatedUser);

      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.CURRENT_USER],
      });

      notify("Perfil atualizado com sucesso", "success");
    },

    onError: (error: any) => {
      const message = getErrorMessage(error);
      console.error("Erro ao atualizar perfil:", message);
      notify(message, "error");
    },
  });
};
