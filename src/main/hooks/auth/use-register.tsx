"use client";
import { notify } from "@/components/presentation/toast/Toast";
import { authService } from "@/main/services/auth/auth-service";
import { queryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeysEnum.SIGN_UP] });
      notify("Usuário criado com sucesso", "success");
      push("/login");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
