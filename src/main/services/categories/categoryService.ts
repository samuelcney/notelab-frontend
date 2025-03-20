import { api } from "../axios/axiosInstance";

export const categoryService = {
  getAllCategories: async () => {
    const { data } = await api.get("/categories");
    return data;
  },
};
