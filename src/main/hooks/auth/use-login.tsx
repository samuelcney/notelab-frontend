import { useAuth } from "@/main/context/auth";
import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { pathNameEnum, QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (credentials: Parameters<typeof authService.signIn>[0]) => {
      const { token } = await authService.signIn(credentials);
      // /auth/login não retorna o usuário; buscamos o perfil com o token.
      const user = await authService.me(token);
      return { token, user };
    },
    onSuccess: ({ token, user }) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.SIGN_IN] });
      login(token, user);
      push(pathNameEnum.HOME);
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
