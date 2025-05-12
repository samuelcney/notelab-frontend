import { userService } from "@/main/services/users/userService";
import { UserProps } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery<UserProps[]>({
    queryKey: [QueryKeysEnum.GET_USERS],
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 5,
  });
};
