"use client";

import { authService } from "@/main/services/auth/auth-service";
import { Button } from "@/presentation/components/button";
import { Input } from "@/presentation/components/input";
import { notify } from "@/presentation/components/toast/Toast";
import { getErrorMessage } from "@/utils/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    newPassword: z.string().min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const email = localStorage.getItem("recoverPasswordEmail");
    if (!email) {
      notify(
        "Email não encontrado. Por favor, solicite um novo token.",
        "error"
      );
      router.push("/recover-password");
      return;
    }

    try {
      await authService.resetPassword({ email, newPassword: data.newPassword });
      notify("Senha atualizada com sucesso!", "success");
      localStorage.removeItem("recoverPasswordEmail");
      router.push("/login");
    } catch (err) {
      notify(getErrorMessage(err), "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="w-full">
        <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
          Para redefinir sua senha, digite a nova senha abaixo:
        </h1>
      </div>
      <Input.Content
        label="Nova senha"
        type="password"
        register={register("newPassword")}
        error={errors.newPassword}
        placeholder="Digite a nova senha"
      />
      <Input.Content
        label="Confirmar senha"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
        placeholder="Confirme a nova senha"
      />
      <Button.Content type="submit" title="Redefinir senha" />
    </form>
  );
}
