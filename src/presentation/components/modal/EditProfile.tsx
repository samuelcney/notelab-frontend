"use client";

import { useModal } from "@/main/context/modal";
import { useUpdateProfile } from "@/main/hooks/users/use-update-profile";
import {
  buildProfileFormData,
  editProfileSchema,
  EditProfileSchemaType,
} from "@/main/schemas/edit-profile.schema";
import { Button } from "@/presentation/ui/button";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { Textarea } from "@/presentation/ui/textarea";
import { UserType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: UserType;
}

export const EditProfileModal = ({ user }: Props) => {
  const { closeModal } = useModal();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user.userBio?.avatarUrl || "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.userBio?.bio || "",
      phone: user.userBio?.phone || "",
      avatarUrl: user.userBio?.avatarUrl || "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarUrl(result);
        setValue("avatarUrl", result);
      };
      reader.readAsDataURL(selectedFile);

      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: EditProfileSchemaType) => {
    const finalFormData = buildProfileFormData(data, user, file ?? undefined);

    try {
      await updateProfile({ userId: user.id, formData: finalFormData });
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    reset();
    setAvatarUrl(user.userBio?.avatarUrl || "");
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 w-full flex-col justify-between"
    >
      <div className="flex flex-col flex-1 p-1 gap-4 w-full">
        <h1 className="text-xl font-semibold tracking-wider">
          Editar dados da conta:
        </h1>
        <span className="w-full h-[1px] bg-light-gray mb-2" />

        <div className="w-full flex items-center justify-center">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-green-600">
            <img
              src={avatarUrl || "/images/default-avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageUpload}
          className="mt-2"
        />

        <div className="mt-5 flex flex-row gap-4 w-full">
          <span className="space-y-2 w-full">
            <Label>Nome</Label>
            <Input {...register("name")} placeholder="Digite seu nome" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </span>

          <span className="space-y-2 w-full">
            <Label>Telefone</Label>
            <Input
              placeholder="(99) 99999-9999"
              {...register("phone")}
              onChange={(e) => setValue("phone", e.target.value)}
              value={undefined}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </span>
        </div>

        <span className="space-y-2 w-full">
          <Label>Biografia</Label>
          <Textarea
            rows={6}
            maxLength={200}
            placeholder="Conte-nos sobre você"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </span>
      </div>

      <div className="flex flex-row w-full items-end justify-end gap-4 p-2">
        <Button
          type="button"
          variant="outline"
          className="w-fit border-border"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="default"
          className="w-fit bg-green-500 text-white"
          disabled={isPending}
        >
          {isPending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
};
