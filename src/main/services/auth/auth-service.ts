import { CreateUserDTO, LoginDTO } from "@/types/types";
import { api } from "../../http/axios/axios-instance";

export const authService = {
  signIn: async (userData: LoginDTO) => {
    const { data } = await api.post("/auth/login", userData);
    return data;
  },

  signUp: async (userData: CreateUserDTO) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  requestPasswordReset: async (email: string) => {
    const { data } = await api.post("/auth/recover-password", { email });
    return data;
  },

  logout: async () => {
    return await api.post("/auth/logout");
  },
};
