import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" }),
    newPassword: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" })
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    confirmNewPassword: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });
