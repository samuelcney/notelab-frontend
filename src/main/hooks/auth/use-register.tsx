"use client";

import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.SIGN_UP] });
      notify("Usuário criado com sucesso", "success");
      push("/login");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
