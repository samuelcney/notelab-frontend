"use client";

import { useCourseStore } from "@/main/stores/course-store";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "./components/content/empty-state";
import { LessonList } from "./components/content/lesson-list";
import { ModuleHeader } from "./components/content/module-header";

export function CourseContentForm() {
  const { course, addModule } = useCourseStore();
  const [activeModule, setActiveModule] = useState(
    course.modules.length > 0 ? course.modules[0].id : ""
  );

  const handleAddModule = () => {
    addModule();
    setTimeout(() => {
      if (course.modules.length > 0) {
        setActiveModule(course.modules[course.modules.length - 1].id);
      }
    }, 0);
  };

  return (
    <Card className="mt-4 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Conteúdo do Curso</CardTitle>
          <CardDescription>
            Organize seu curso em módulos e aulas.
          </CardDescription>
        </div>
        <Button onClick={handleAddModule} className="border-foreground border">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Módulo
        </Button>
      </CardHeader>
      <CardContent>
        {course.modules.length === 0 ? (
          <EmptyState onAddModule={handleAddModule} />
        ) : (
          <Tabs
            value={activeModule}
            onValueChange={setActiveModule}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-4 overflow-hidden">
              <TabsList className="flex-1 overflow-x-auto gap-2 overflow-y-hidden">
                {course.modules.map((module) => (
                  <TabsTrigger
                    key={module.id}
                    value={module.id}
                    className="flex-shrink-0 border border-foreground w-28"
                  >
                    {module.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {course.modules.map((module) => (
              <TabsContent
                key={module.id}
                value={module.id}
                className="space-y-4"
              >
                <ModuleHeader
                  module={module}
                  onModuleRemoved={() => {
                    if (
                      course.modules.length > 0 &&
                      course.modules[0].id !== module.id
                    ) {
                      setActiveModule(course.modules[0].id);
                    }
                  }}
                />
                <LessonList moduleId={module.id} lessons={module.lessons} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
