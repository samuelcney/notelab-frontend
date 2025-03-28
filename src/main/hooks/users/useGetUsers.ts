import { notify } from "@/components/presentation/toast/Toast";
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
