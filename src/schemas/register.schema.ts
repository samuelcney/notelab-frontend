import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().nonempty({ message: "" }),
    email: z
      .string()
      .nonempty({ message: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    passwordConfirmation: z.string().nonempty({ message: "" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export { registerSchema };
