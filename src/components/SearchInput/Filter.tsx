"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "../Icon";
import { useCategories } from "@/hooks/categories/useCategories";

export const Filter = () => {
  const { data: categories } = useCategories();
  const [selectedCategories, setSelectedCategories] = React.useState<
    Record<string, boolean>
  >({});

  const handleCheckedChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: checked,
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="Filter" size={26} className="text-white" strokeWidth={1} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background text-foreground">
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
