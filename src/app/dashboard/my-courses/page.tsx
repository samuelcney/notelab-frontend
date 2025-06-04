"use client";

import { useGetCourses } from "@/main/hooks";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetEnrollments } from "@/main/hooks/enrollments/use-get-enrollments";
import { CourseCard } from "@/presentation/components/course-card/CourseCard";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { BookOpen, Loader2, Trophy } from "lucide-react";

export default function MyCoursesPage() {
  const user = useCurrentUser();
  if (!user) return null;

  const { data: enrollments, isLoading: loadingEnrrolments } =
    useGetEnrollments(user.id);
  const { data: courses, isLoading: loadingCourses } = useGetCourses();

  const coursesInEnrrolment = enrollments?.map((course) => course.courseId);
  const filteredCourses = courses?.filter((course) =>
    coursesInEnrrolment?.includes(course.id)
  );

  if (loadingCourses || loadingEnrrolments) {
    <PageRoot>
      <div className="flex flex-1 w-full min-h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    </PageRoot>;
  }

  return (
    <PageRoot>
      <div className="flex flex-1 w-full min-h-screen">
        <div className="mx-14 mt-8 mb-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Meus Cursos
            </h1>
            <p>Acompanhe seu progresso e continue aprendendo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-xl p-6 shadow-sm border border-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total de Cursos</p>
                  <p className="text-3xl font-bold">{enrollments?.length}</p>
                </div>
                <div className="p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 shadow-sm border border-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Concluídos</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <div className="p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* <div className=" rounded-xl p-6 shadow-sm border border-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Horas Estudadas</p>
                  <p className="text-3xl font-bold text-green-600">0h</p>
                </div>
                <div className="p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="rounded-xl p-6 shadow-sm border border-foreground mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Progresso Geral
              </h3>
              <span className="text-2xl font-bold text-green-500">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${60}%` }}
              ></div>
            </div>
          </div> */}

          <div className="flex flex-row items-center mt-4 flex-wrap gap-6 w-full justify-center">
            {!loadingCourses &&
            !loadingEnrrolments &&
            enrollments?.length === 0 ? (
              <h1 className="text-2xl font-bold text-foreground">
                Você ainda não está matriculado em nenhum curso.
              </h1>
            ) : (
              filteredCourses?.map((c) => (
                <div
                  className="flex-shrink-0 flex-grow-0 basis-full max-sm:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5"
                  key={c.id + c.instructorId}
                >
                  <CourseCard
                    key={c.id + c.instructorId}
                    categories={c.categories}
                    courseName={c.name}
                    difficulty={c.difficulty}
                    instructorName={user?.name || ""}
                    id={c.id}
                    coverImage={c.coverImage || ""}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
