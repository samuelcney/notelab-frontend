import { cartService } from "@/main/services/cart/cartService";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../auth/use-current-user";

export const useAddItemCart = () => {
  const context = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.ADD_ITEM_CART, context?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_CART, context?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_CART_ITEM_COUNT, context?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.ITEM_ALREADY_IN_CART, context?.id],
      });
      notify("Curso adicionado ao carrinho", "success");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", errorMessage);
      notify(errorMessage, "error");
    },
  });
};
