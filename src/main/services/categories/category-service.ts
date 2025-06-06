import { http } from "../../http/axios/axios-instance";

export const categoryService = {
  getAllCategories: async () => {
    const { data } = await http.get("/categories");
    return data;
  },
};
