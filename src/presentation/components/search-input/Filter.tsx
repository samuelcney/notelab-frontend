"use client";

import { useGetCategories } from "@/main/hooks";
import { Category } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import Icon from "../Icon";

export const Filter = () => {
  const { data: categories } = useGetCategories();
  const [selectedCategories, setSelectedCategories] = React.useState<
    Record<string, boolean>
  >({});

  const handleCheckedChange = (categoryId: number, checked: boolean) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: checked,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon
          name="SlidersHorizontal"
          size={26}
          className="text-white"
          strokeWidth={1}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-light-dark text-white">
        <DropdownMenuLabel>Filtro</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories?.map((category: Category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={selectedCategories[category.id] || false}
            onCheckedChange={(checked) =>
              handleCheckedChange(category.id, checked)
            }
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
