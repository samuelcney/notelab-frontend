import { notify } from "@/components/Toast/Toast";
import { userService } from "@/main/services/users/userService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify("Usuário criado com sucesso", "success");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
