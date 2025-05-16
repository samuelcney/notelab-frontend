import { userService } from "@/main/services/users/userService";
import { UserType } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery<UserType[]>({
    queryKey: [QueryKeysEnum.GET_USERS],
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 5,
  });
};
