import { useAuth } from "@/main/context/auth";
import { authService } from "@/main/services/auth/auth-service";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { refreshToken, updateUser, user } = useAuth();
  const { refresh } = useRouter();
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authService.changePassword(currentPassword, newPassword),
    onSuccess: (data) => {
      const { session, message } = data;

      if (session?.access_token && session.user) {
        refreshToken(session.access_token);
        updateUser(session.user);
      }

      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.CURRENT_USER, user?.id],
      });
      refresh();
      notify(message, "success");
    },

    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
