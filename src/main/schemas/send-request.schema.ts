import { z } from "zod";

export const instructorRequestSchema = z.object({
  fullName: z.string().nonempty({ message: "Nome é obrigatório." }),
  cpf: z
    .string()
    .nonempty({ message: "CPF é obrigatório." })
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, { message: "CPF inválido." }),
  email: z
    .string()
    .nonempty({ message: "E-mail é obrigatório." })
    .email({ message: "E-mail inválido." }),
  phone: z
    .string()
    .nonempty({ message: "Telefone é obrigatório." })
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: "Telefone inválido." }),
  musicalEducation: z.enum(
    [
      "conservatory",
      "graduation",
      "post-graduation",
      "master",
      "doctorate",
      "self-taught",
    ],
    { required_error: "Formação musical é obrigatória." }
  ),
  yearsExperience: z.enum(["1-2", "3-5", "6-10", "10+"], {
    required_error: "Tempo de experiência é obrigatório.",
  }),
  instruments: z
    .string()
    .nonempty({ message: "Instrumentos são obrigatórios." }),
  biography: z.string().nonempty({ message: "Biografia é obrigatória." }),
  documents: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Arquivo deve ter no máximo 5MB.",
    })
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      { message: "Formato de arquivo inválido." }
    )
    .optional(),
});
