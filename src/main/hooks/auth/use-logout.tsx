import { notify } from "@/components/presentation/toast/Toast";
import { useAuth } from "@/main/context/auth";
import { authService } from "@/main/services/auth/auth-service";
import { getErrorMessage } from "@/utils/Errors";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (data) => {
      queryClient.clear();
      logout();
      push("/login");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
