import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation } from "@tanstack/react-query";

export const useSendRecoverPassword = () => {
  return useMutation({
    mutationFn: authService.requestPasswordReset,
    onSuccess: (data) => {
      notify(data.message, "success");
    },

    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
