import { useQuery } from "@tanstack/react-query";
import { http } from "../http/axios/axios-instance";

export const useGetBackgrounds = () => {
  return useQuery({
    queryKey: ["backgrounds"],
    queryFn: async () => {
      const data = await http.get("/media/backgrounds");

      return data.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
