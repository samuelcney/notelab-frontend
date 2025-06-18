"use client";

import { authService } from "@/main/services/auth/auth-service";
import { Button } from "@/presentation/components/button";
import { Input } from "@/presentation/components/input";
import { notify } from "@/presentation/components/toast/Toast";
import { getErrorMessage } from "@/utils/Errors";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function ValidateTokenForm({ onSuccess }: { onSuccess: () => void }) {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const email = localStorage.getItem("recoverPasswordEmail");
    if (!email) {
      notify(
        "Email não encontrado. Por favor, solicite um novo token.",
        "error"
      );
      push("/login");
      return;
    }

    try {
      await authService.validateToken(data.token, email);
      notify("Token validado com sucesso!", "success");
      onSuccess();
    } catch (err) {
      notify(getErrorMessage(err), "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="w-full">
        <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
          Para validar o token, digite o código enviado para o seu email:
        </h1>
      </div>
      <Input.Content
        label="Token"
        register={register("token")}
        error={errors.token as import("react-hook-form").FieldError | undefined}
        placeholder="Digite o token enviado"
      />
      <Button.Content type="submit" title="Validar token" />
    </form>
  );
}
