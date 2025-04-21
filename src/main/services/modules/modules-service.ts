import { api } from "../axios/axios-instance";

export const moduleService = {
  getModuleById: async (id: number) => {
    const { data } = await api.get(`/modules/${id}`);
    return data;
  },
};
