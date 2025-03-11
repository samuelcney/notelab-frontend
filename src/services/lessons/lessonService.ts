import { api } from "../axios/axiosInstance";

export const lessonService = {
  getLessonById: async (id: number) => {
    const { data } = await api.get(`/lessons/${id}`);
    return data;
  },
};
