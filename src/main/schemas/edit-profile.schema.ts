import { UserType } from "@/types/types";
import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Esse campo deve ser preenchido" })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, {
      message: "Telefone inválido (ex: (11) 91234-5678)",
    })
    .optional()
    .or(z.literal("")),
  bio: z.string().max(200, { message: "Máximo de 200 caracteres" }).optional(),
  avatarUrl: z.string().optional(),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;

export const buildProfileFormData = (
  data: EditProfileSchemaType,
  currentUser: UserType,
  file?: File
): FormData => {
  const formData = new FormData();

  if (data.name !== currentUser.name) formData.append("name", data.name);
  if ((data.bio || "") !== (currentUser.userBio?.bio || ""))
    formData.append("bio", data.bio || "");
  if ((data.phone || "") !== (currentUser.userBio?.phone || ""))
    formData.append("phone", data.phone || "");
  if (file) formData.append("avatar", file);

  return formData;
};
