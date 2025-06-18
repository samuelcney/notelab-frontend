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
    const { data } = await http.post("/recovery-password/email", {
      email,
    });
    return data;
  },

  validateToken: async (token: string, email: string) => {
    const { data } = await http.post("/recovery-password/validate-token", {
      email,
      token,
    });
    return data;
  },

  resetPassword: async (data: { email: string; newPassword: string }) => {
    const { email, newPassword } = data;
    const response = await http.post("/recovery-password/reset", {
      email,
      newPassword,
    });
    return response.data;
  },

  logout: async () => {
    return await http.post("/auth/logout");
  },
};
