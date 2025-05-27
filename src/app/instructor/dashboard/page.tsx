"use client";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetCoursesByInstructorId } from "@/main/hooks/courses/use-get-instructor-courses";
import { CourseCard } from "@/presentation/components/course-card/CourseCard";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { BookOpen, Loader2, PlusCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstructorDashboard() {
  const { replace } = useRouter();
  const user = useCurrentUser();

  if (!user) return null;

  const { data: course, isPending } = useGetCoursesByInstructorId(user.id);

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="mx-14 mt-1 mb-10">
          <div className="flex items-start flex-col">
            <div className="flex flex-row mb-2 justify-between w-full">
              <div className="flex flex-col">
                <Separator className="bg-foreground" />
              </div>
              <Button
                variant="default"
                className="h-10 text-background bg-foreground"
                onClick={() => {
                  replace("/instructor/dashboard/add-course");
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4 text-background" />
                <p className="text-background font-semibold text-base">
                  Criar Novo Curso
                </p>
              </Button>
            </div>

            <div className="w-full space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de Cursos
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        course?.length
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">---</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Alunos Ativos
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">0</div>
                    <p className="text-sm text-muted-foreground">---</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col px-6 pt-4">
                <h1 className="text-xl font-bold">
                  Cursos publicados por você:
                </h1>
                <div className="flex flex-row items-center mt-4 flex-wrap gap-6">
                  {course?.map((c) => (
                    <div
                      className="flex-shrink-0 flex-grow-0 basis-full max-sm:basis-1/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/5"
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
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
