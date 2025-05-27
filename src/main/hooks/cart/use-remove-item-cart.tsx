import { cartService } from "@/main/services/cart/cartService";
import { notify } from "@/presentation/components/toast/Toast";
import { QueryKeysEnum } from "@/utils/Enums";
import { getErrorMessage } from "@/utils/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../auth/use-current-user";

export const useRemoveItemCart = () => {
  const context = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeItemCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_CART, context?.id],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.GET_CART_ITEM_COUNT, context?.id],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeysEnum.ITEM_ALREADY_IN_CART, context?.id],
      });

      notify("Curso removido do carrinho", "success");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error);
      notify(errorMessage, "error");
    },
  });
};
