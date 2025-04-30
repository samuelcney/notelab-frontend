import { z } from "zod";

export const recoverPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
});
