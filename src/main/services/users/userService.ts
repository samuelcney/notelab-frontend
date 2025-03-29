import { api } from "../axios/axiosInstance";

export const userService = {
  getAllUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },

  signUp: async (userData: CreateUserDTO) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
};
