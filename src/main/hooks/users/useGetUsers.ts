import { userService } from "@/main/services/users/userService";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery<UserProps[]>({
    queryKey: [queryKeysEnum.GET_USERS],
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 5,
  });
};
