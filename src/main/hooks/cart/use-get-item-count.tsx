import { cartService } from "@/main/services/cart/cartService";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCartItemCount = (id: string) => {
  const data = useQuery<number>({
    queryKey: [QueryKeysEnum.GET_CART_ITEM_COUNT, id],
    queryFn: async () => {
      const cart = await cartService.getUserCart(id);
      return cart?.cartItems?.length ?? 0;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
