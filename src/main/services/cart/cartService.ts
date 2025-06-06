import { http } from "@/main/http/axios/axios-instance";

interface CartItemRequest {
  courseId: string;
  cartId: string;
}

export const cartService = {
  getUserCart: async (id: string) => {
    const { data } = await http.get(`/cart/${id}`);
    return data;
  },

  addItemToCart: async (req: CartItemRequest) => {
    const { data } = await http.post(`/cart/${req.cartId}/add/${req.courseId}`);
    return data;
  },

  removeItemCart: async (req: CartItemRequest) => {
    const { data } = await http.delete(
      `/cart/${req.cartId}/remove/${req.courseId}`
    );
    return data;
  },
};
