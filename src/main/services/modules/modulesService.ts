import { api } from "../axios/axiosInstance";

export const moduleService = {
  getModuleById: async (id: number) => {
    const { data } = await api.get(`/modules/${id}`);
    return data;
  },
};
