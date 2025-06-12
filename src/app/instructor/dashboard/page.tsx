"use client";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetCoursesByInstructorId } from "@/main/hooks/courses/use-get-instructor-courses";
import { useGetCountEnrollments } from "@/main/hooks/enrollments/use-get-count-enrollments";
import { CourseCard } from "@/presentation/components/course-card/presentation/CourseCardPresentation";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { BookOpen, Loader2, PlusCircle, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InstructorDashboard() {
  const { replace } = useRouter();
  const user = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  const { data: courses, isPending } = useGetCoursesByInstructorId(user.id);
  const { data: enrollments, isLoading } = useGetCountEnrollments(user.id);

  const searchLower = searchTerm.toLowerCase();
  const filteredCourses = courses?.filter((course) =>
    course.name.toLowerCase().includes(searchLower)
  );

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="mx-14 mt-1 mb-10">
          <div className="flex items-start flex-col">
            <div className="flex flex-row mb-2 justify-between w-full">
              <Separator className="bg-foreground" />
              <Button
                variant="default"
                className="h-10 text-background bg-foreground"
                onClick={() => replace("/instructor/dashboard/add-course")}
              >
                <PlusCircle className="mr-2 h-4 w-4 text-background" />
                <p className="text-background font-semibold text-base">
                  Criar Novo Curso
                </p>
              </Button>
            </div>

            <div className="w-full space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border border-foreground">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium">
                      Total de Cursos
                    </CardTitle>
                    <BookOpen className="h-6 w-6 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        courses?.length || 0
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">---</p>
                  </CardContent>
                </Card>

                <Card className="border border-foreground">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium">
                      Matrículas Ativas
                    </CardTitle>
                    <Users className="h-6 w-6 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        enrollments || 0
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">---</p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4 w-full max-w-md flex flex-col space-y-2">
                <Label>
                  <span className="text-sm font-medium text-foreground">
                    Buscar Cursos
                  </span>
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="pt-4">
                <h1 className="text-xl font-bold mb-4">
                  Cursos publicados por você:
                </h1>

                <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {filteredCourses && filteredCourses.length > 0 ? (
                    filteredCourses.map((c) => (
                      <div
                        className="flex-shrink-0 flex-grow-0"
                        key={c.id + c.instructorId}
                      >
                        <CourseCard
                          key={c.id + c.instructorId}
                          categories={c.categories}
                          courseName={c.name}
                          difficulty={c.difficulty}
                          instructorName={user?.name || ""}
                          price={c.price}
                          id={c.id}
                          coverImage={c.coverImage || ""}
                          isPresentation
                        />
                      </div>
                    ))
                  ) : (
                    <h2 className="text-lg font-semibold text-muted-foreground col-span-full">
                      Nenhum curso encontrado com esse nome.
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
