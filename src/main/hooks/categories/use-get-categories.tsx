import { categoryService } from "@/main/services/categories/category-service";
import { queryKeysEnum } from "@/utils/Enums";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const data = useQuery({
    queryKey: [queryKeysEnum.GET_CATEGORIES],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
