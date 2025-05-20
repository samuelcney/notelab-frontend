import { CourseState } from "@/main/stores/course-store";
import { api } from "../../http/axios/axios-instance";

export const courseService = {
  getAllCourses: async () => {
    const { data } = await api.get("/courses");
    return data;
  },

  getCourseById: async (id: string) => {
    const { data } = await api.get(`courses/${id}`);
    return data;
  },

  getCourseByInstructorId: async (id: string) => {
    const { data } = await api.get(`courses/instructor/${id}`);
    return data;
  },

  createCourse: async (courseData: CourseState) => {
    const { data } = await api.post("/courses", {
      instructorId: courseData.instructorId,
      name: courseData.name,
      description: courseData.description,
      categories: courseData.categories,
      difficulty: courseData.difficulty,
      coverImage: courseData.coverImage,
      modules: courseData.modules,
      typeCourse: courseData.typeCourse,
      price: courseData.price,
      issueCertificate: courseData.issueCertificate,
    });
    return data;
  },
};
