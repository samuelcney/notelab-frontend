import { http } from "@/main/http/axios/axios-instance";
import { UserType } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useMe = (token: string | null, enabled = true) => {
  return useQuery<UserType>({
    queryKey: [QueryKeysEnum.CURRENT_USER, token],
    queryFn: async () => {
      const { data } = await http.get("users/info/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token && enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
