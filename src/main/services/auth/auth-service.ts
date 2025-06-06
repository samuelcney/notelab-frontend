import { CreateUserDTO, LoginDTO } from "@/types/types";
import { http } from "../../http/axios/axios-instance";

export const authService = {
  signIn: async (userData: LoginDTO) => {
    const { data } = await http.post("/auth/login", userData);
    return data;
  },

  signUp: async (userData: CreateUserDTO) => {
    const { data } = await http.post("/auth/register", userData);
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const { data } = await http.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return data;
  },

  requestPasswordReset: async (email: string) => {
    const { data } = await http.post("/auth/recover-password", { email });
    return data;
  },

  logout: async () => {
    return await http.post("/auth/logout");
  },
};
