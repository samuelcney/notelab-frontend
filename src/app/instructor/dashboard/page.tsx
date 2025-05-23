"use client";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetCoursesByInstructorId } from "@/main/hooks/courses/use-get-instructor-courses";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { BookOpen, Loader2, PlusCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstructorDashboard() {
  const { replace } = useRouter();
  const user = useCurrentUser();
  const { data: course, isPending } = useGetCoursesByInstructorId(user.id);

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="mx-14 mt-4 mb-14">
          <Tabs defaultValue="general" className="flex items-start flex-col">
            <div className="flex flex-row mb-6 justify-between w-full">
              <div className="flex flex-col">
                <TabsList className="gap-7 my-1">
                  <TabsTrigger value="general" className="text-base">
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="text-base">
                    Meus Cursos
                  </TabsTrigger>
                  <TabsTrigger value="students" className="text-base">
                    Alunos
                  </TabsTrigger>
                </TabsList>
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

            <TabsContent value="general" className="w-full space-y-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageRoot>
  );
}
