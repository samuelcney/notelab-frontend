import { api } from "../axios/axios-instance";

export const categoryService = {
  getAllCategories: async () => {
    const { data } = await api.get("/categories");
    return data;
  },
};
