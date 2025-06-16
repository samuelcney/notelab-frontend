import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" })
      .regex(/^[^0-9]*$/, { message: "Nome não pode conter números" }),
    email: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" })
      .email({ message: "Email inválido" }),
    role: z.string().nonempty({ message: "Esse campo deve ser preenchido" }),
    password: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" })
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    passwordConfirmation: z
      .string()
      .nonempty({ message: "Esse campo deve ser preenchido" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export { registerSchema };
