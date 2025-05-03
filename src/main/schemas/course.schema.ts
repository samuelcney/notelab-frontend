import { courseLevelEnum, lessonTypeEnum } from "@/utils/Enums";
import { z } from "zod";

const lessonSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  duration: z.string().min(1),
  type: z.nativeEnum(lessonTypeEnum),
  content: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
});

const moduleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  lessons: z.array(lessonSchema),
});

export const courseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  categories: z.array(z.string().min(1)).min(1),
  difficulty: z.nativeEnum(courseLevelEnum),
  coverImage: z.string().url().nullable(),
  modules: z.array(moduleSchema).min(1),
  typeCourse: z.enum(["free", "paid"]),
  price: z.number().min(0),
  promotionalPrice: z.number().min(0),
  issueCertificate: z.boolean(),
  workload: z.string().min(1),
  instructorId: z.string().min(1),
});
