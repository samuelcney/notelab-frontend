import { categoryService } from "@/main/services/categories/category-service";
import { Category } from "@/types/types";
import { QueryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const data = useQuery<Category[]>({
    queryKey: [QueryKeysEnum.GET_CATEGORIES],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
