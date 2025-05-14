import { useAuth } from "@/main/context/auth";
import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
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
      const { token, user } = data;

      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.SIGN_IN] });
      login(token, user);
      push("/dashboard/home");

      setTimeout(() => {}, 3000);
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
