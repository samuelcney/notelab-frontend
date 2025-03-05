import { api } from "../axios/axiosInstance";

export const userService = {
  getAllUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },
  createUser: async (userData: CreateUserDTO) => {
    const { data } = await api.post("/users", userData);
    return data;
  },
};
