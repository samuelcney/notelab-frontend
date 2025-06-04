import { api } from "../../http/axios/axios-instance";

export const moduleService = {
  getModuleById: async (id: string) => {
    const { data } = await api.get(`/modules/${id}`);
    return data;
  },
};
