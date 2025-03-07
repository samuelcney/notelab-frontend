import { api } from "../axios/axiosInstance";

export const courseService = {
  getAllCourses: async () => {
    const { data } = await api.get("/courses");
    return data;
  },
};
