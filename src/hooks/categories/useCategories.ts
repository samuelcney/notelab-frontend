import { categoryService } from "@/services/categories/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const data = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
