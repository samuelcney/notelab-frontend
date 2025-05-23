"use client";

import { useGetCategories, useGetCourses } from "@/main/hooks";
import { CourseCatalogCard } from "@/presentation/components/course-card/CourseCatalogCard";
import { CourseCatalogCardSkeleton } from "@/presentation/components/course-card/CourseCatalogCardSkeleton";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Button } from "@/presentation/ui/button";
import { Checkbox } from "@/presentation/ui/checkbox";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function CatalogPage() {
  const { data: courses = [], isPending: isLoadingCourses } = useGetCourses();
  const { data: categories = [], isPending: isLoadingCategories } =
    useGetCategories();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      course.categories.some((cat) =>
        selectedCategories.includes(cat.category.id)
      );

    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
  };

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="md:ml-24 mt-6 mb-8 md:mb-14 px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
            Catálogo
          </h1>
        </div>

        <div className="md:hidden px-4 mb-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border border-foreground"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtros{" "}
            {selectedCategories.length > 0 && `(${selectedCategories.length})`}
          </Button>

          {showFilters && (
            <div className="border border-foreground rounded-md p-4 mt-2">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Categorias</h2>
                {selectedCategories.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {isLoadingCategories ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-5 bg-muted rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`instrument-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.id)
                        }
                      />
                      <Label
                        htmlFor={`instrument-${category.id}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full items-start justify-center flex flex-1 gap-5 pb-12 max-sm:flex-col px-4 md:px-0">
          <div className="hidden md:flex h-full w-[20%] border border-foreground rounded-md flex-col gap-4 p-4 sticky top-24">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Filtros</h2>
              {selectedCategories.length > 0 ? (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled></Button>
              )}
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="border-t pt-4 border-foreground">
              <h3 className="font-medium mb-4">Categorias de Instrumentos</h3>
              <div className="space-y-6">
                {isLoadingCategories ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-5 bg-muted rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[70%] h-full flex flex-col gap-8">
            <div className="w-full md:ml-9">
              <h2 className="text-2xl md:text-3xl font-semibold">
                {selectedCategories.length > 0
                  ? `Filtros Ativos (${filteredCourses.length})`
                  : "Todos os cursos"}
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {isLoadingCourses ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <CourseCatalogCardSkeleton key={index} />
                ))
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <CourseCatalogCard key={course.id + index} {...course} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-xl text-muted-foreground mb-2">
                    Nenhum curso encontrado
                  </p>
                  <p className="text-muted-foreground">
                    Tente ajustar seus filtros ou buscar por outro termo
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border border-foreground"
                    onClick={clearFilters}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
