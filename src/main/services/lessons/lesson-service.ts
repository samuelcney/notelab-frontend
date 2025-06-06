import { http } from "../../http/axios/axios-instance";

export const lessonService = {
  getLessonById: async (id: string) => {
    const { data } = await http.get(`/lessons/${id}`);
    return data;
  },

  getLessonsByModuleId: async (moduleId: string) => {
    const { data } = await http.get(`/lessons/module/${moduleId}`);
    return data;
  },
};
