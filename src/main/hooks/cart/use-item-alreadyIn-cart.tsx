import { cartService } from "@/main/services/cart/cartService";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetItemAlreadyInCart = (
  userId: string,
  currentCourseId: string
) => {
  const data = useQuery<boolean>({
    queryKey: [QueryKeysEnum.ITEM_ALREADY_IN_CART, userId],
    queryFn: async () => {
      const cart = await cartService.getUserCart(userId);

      const isItemInCart = cart?.cartItems?.some(
        (item: any) => item.course.id === currentCourseId
      );

      return isItemInCart;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
