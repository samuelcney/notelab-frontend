"use client";

import { useGetCourses } from "@/main/hooks";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetEnrollmentsByUserId } from "@/main/hooks/enrollments/use-get-enrollments";
import { CourseCard } from "@/presentation/components/course-card/CourseCard";
import { PageRoot } from "@/presentation/layout/PageRoot";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { BookOpen, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function MyCoursesPage() {
  const user = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  const { data: enrollments, isLoading: loadingEnrollments } =
    useGetEnrollmentsByUserId(user.id);
  const { data: courses, isLoading: loadingCourses } = useGetCourses();

  const isLoading = loadingCourses || loadingEnrollments;

  const enrolledCourseIds = useMemo(
    () => enrollments?.map((enrollment) => enrollment.courseId) || [],
    [enrollments]
  );

  const enrolledCourses = useMemo(() => {
    return (
      courses?.filter((course) => enrolledCourseIds.includes(course.id)) || []
    );
  }, [courses, enrolledCourseIds]);

  const searchLower = searchTerm.toLowerCase();
  const searchFilteredCourses = useMemo(() => {
    return enrolledCourses.filter((course) =>
      course.name.toLowerCase().includes(searchLower)
    );
  }, [enrolledCourses, searchLower]);

  if (isLoading) {
    return (
      <PageRoot>
        <div className="flex flex-1 w-full min-h-screen items-center justify-center">
          <Loader2 className="animate-spin text-foreground" size={32} />
        </div>
      </PageRoot>
    );
  }

  return (
    <PageRoot>
      <div className="flex flex-1 w-full min-h-screen">
        <div className="mx-14 mt-8 mb-10 w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Meus Cursos
            </h1>
            <p>Acompanhe seu progresso e continue aprendendo</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border border-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-medium">Total de Cursos</CardTitle>
                <BookOpen className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {loadingEnrollments ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    enrolledCourses.length
                  )}
                </div>
                <p className="text-sm text-muted-foreground">---</p>
              </CardContent>
            </Card>

            <div className="pt-4 w-full flex flex-col space-y-2 justify-end">
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
          </div>

          <div className="grid gap-6 w-full mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {searchFilteredCourses.length > 0 ? (
              searchFilteredCourses.map((course) => (
                <div key={course.id + course.instructorId}>
                  <CourseCard
                    key={course.id + course.instructorId}
                    categories={course.categories}
                    courseName={course.name}
                    difficulty={course.difficulty}
                    instructorName={user?.name || ""}
                    id={course.id}
                    coverImage={course.coverImage || ""}
                    description={course.description || ""}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <p className="text-xl font-medium mt-8">
                  Nenhum curso encontrado.
                </p>
                <p className="text-sm">
                  Tente buscar por outro nome ou verifique se você está
                  matriculado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
