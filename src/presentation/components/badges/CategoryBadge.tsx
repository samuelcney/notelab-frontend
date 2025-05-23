import { categoryColors } from "@/utils/Constants";

export const CategoryBadge = ({ categoryName }: { categoryName: string }) => {
  return (
    <p
      className="text-xs text-white px-2 py-1 rounded-md shadow-md font-semibold whitespace-nowrap max-md:px-1 max-md:text-[10px]"
      style={{
        backgroundColor: categoryColors[categoryName],
      }}
    >
      {categoryName.toUpperCase()}
    </p>
  );
};
