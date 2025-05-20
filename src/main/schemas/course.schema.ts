import { courseLevelEnum, lessonTypeEnum } from "@/utils/Enums";
import { z } from "zod";

const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "O título da aula é obrigatório." }),
  type: z.nativeEnum(lessonTypeEnum, {
    errorMap: () => ({ message: "Tipo de aula inválido." }),
  }),
  videoUrl: z
    .string({
      required_error: "O campo de URL das aulas não pode estar vazio.",
    })
    .nonempty({
      message: "A URL do vídeo é obrigatória.",
    })
    .refine(
      (val) => {
        const urlPattern =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com)\/.+$/;
        return urlPattern.test(val);
      },
      {
        message: "A URL do vídeo deve ser um link válido do YouTube ou Vimeo.",
      }
    ),
  duration: z
    .number({
      required_error: "A duração é obrigatória.",
      invalid_type_error: "A duração deve ser um número.",
    })
    .min(0, { message: "A duração deve ser maior ou igual a 0." }),
});

const moduleSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1, { message: "O nome do módulo é obrigatório." }),
    lessons: z.array(lessonSchema).min(1, {
      message: "Cada módulo deve conter pelo menos uma aula.",
    }),
  })
  .strip();

export const courseSchema = z.object({
  name: z.string().min(1, { message: "O nome do curso é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição do curso é obrigatória." }),
  categories: z.array(z.number().min(1)).min(1, {
    message: "Selecione pelo menos uma categoria.",
  }),
  difficulty: z.nativeEnum(courseLevelEnum, {
    errorMap: () => ({ message: "Nível de dificuldade inválido." }),
  }),
  // coverImage: z
  //   .string()
  //   .url({ message: "A URL da imagem de capa é inválida." })
  //   .nullable()
  //   .refine((val) => val !== null, {
  //     message: "A imagem de capa é obrigatória.",
  //   }),
  modules: z.array(moduleSchema).min(1, {
    message: "Adicione pelo menos um módulo.",
  }),
  price: z.number().min(0, { message: "O preço deve ser maior ou igual a 0." }),
  issueCertificate: z.boolean(),
  instructorId: z
    .string()
    .min(1, { message: "ID do instrutor é obrigatório." }),
});
