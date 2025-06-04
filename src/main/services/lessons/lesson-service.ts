import { api } from "../../http/axios/axios-instance";

export const lessonService = {
  getLessonById: async (id: string) => {
    const { data } = await api.get(`/lessons/${id}`);
    return data;
  },

  getLessonsByModuleId: async (moduleId: string) => {
    const { data } = await api.get(`/lessons/module/${moduleId}`);
    return data;
  },
};
