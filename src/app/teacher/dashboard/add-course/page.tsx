import { PageRoot } from "@/presentation/layout/PageRoot";
import { AddCourseForm } from "@/presentation/pages/add-course/add-course-form";

export default function AddCoursePage() {
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="mt-6 mx-6">
          <AddCourseForm />
        </div>
      </div>
    </PageRoot>
  );
}
