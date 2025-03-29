import { categoryService } from "@/main/services/categories/categoryService";
import { queryKeysEnum } from "@/utils/enums/Enums";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const data = useQuery({
    queryKey: [queryKeysEnum.GET_CATEGORIES],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};
