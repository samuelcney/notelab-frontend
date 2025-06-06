import { http } from "../../http/axios/axios-instance";

export const moduleService = {
  getModuleById: async (id: string) => {
    const { data } = await http.get(`/modules/${id}`);
    return data;
  },
};
