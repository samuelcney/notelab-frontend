import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSendRecoverPassword = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: authService.requestPasswordReset,
    onSuccess: (data) => {
      notify(data.message, "success");
    },

    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
