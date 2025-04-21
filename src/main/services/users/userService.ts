import { api } from "../axios/axios-instance";

export const userService = {
  getAllUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },
};
