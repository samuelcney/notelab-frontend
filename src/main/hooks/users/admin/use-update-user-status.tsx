import { http } from "@/main/http/axios/axios-instance";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateStatusProps {
  userId: string;
  newStatus: boolean;
}

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStatusProps) => {
      const response = await http.post(`/users/update/status/${data.userId}`, {
        status: data.newStatus,
      });

      return response.data;
    },

    onSuccess: (data: UpdateStatusProps) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_USERS],
      });

      notify(
        `Usuário ${data.newStatus ? "ativado" : "desativado"} com sucesso`,
        "success"
      );
    },

    onError: (error: any) => {
      const message = getErrorMessage(error);
      console.error("Erro ao atualizar status do usuário:", message);
      notify(message, "error");
    },
  });
};
