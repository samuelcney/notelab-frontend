import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Esse campo deve ser preenchido" })
    .email({ message: "Email inválido" }),
  password: z.string().nonempty({ message: "Esse campo deve ser preenchido" }),
});

export { loginSchema };
