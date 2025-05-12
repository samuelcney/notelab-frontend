import { api } from "@/main/http/axios/axios-instance";
import { UserType } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<UserType>({
    queryKey: [QueryKeysEnum.CURRENT_USER],
    queryFn: async () => {
      const response = await api.get("users/info/me");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
  };
};
