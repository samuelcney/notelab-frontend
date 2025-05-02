import { useAuth } from "@/main/context/auth";
import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { pathNameEnum, queryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { push } = useRouter();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeysEnum.SIGN_IN] });
      login(data);

      setTimeout(() => {
        push(pathNameEnum.HOME);
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
