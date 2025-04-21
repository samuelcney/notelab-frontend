import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z.string().nonempty({ message: "" }),
});

export { loginSchema };
