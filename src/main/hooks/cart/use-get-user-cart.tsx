import { cartService } from "@/main/services/cart/cartService";
import { Cart } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetUserCart = (id: string) => {
  const data = useQuery<Cart>({
    queryKey: [QueryKeysEnum.GET_CART, id],
    queryFn: () => cartService.getUserCart(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
