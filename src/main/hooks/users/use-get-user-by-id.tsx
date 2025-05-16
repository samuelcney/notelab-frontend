import { userService } from "@/main/services/users/userService";
import { UserType } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id: string) => {
  return useQuery<UserType>({
    queryKey: [QueryKeysEnum.GET_USER_BY_ID, id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
