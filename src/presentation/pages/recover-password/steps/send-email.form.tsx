"use client";

import { useSendRecoverPassword } from "@/main/hooks/auth/use-request-password-reset";
import { Button } from "@/presentation/components/button";
import Icon from "@/presentation/components/Icon";
import { Input } from "@/presentation/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Campo obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function SendEmailForm({ onSuccess }: { onSuccess: () => void }) {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useSendRecoverPassword();

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data.email);
    localStorage.setItem("recoverPasswordEmail", data.email);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <span
        className="flex items-center gap-2 text-foreground cursor-pointer"
        onClick={() => {
          push("/login");
        }}
      >
        <ArrowLeft />
      </span>
      <div className="w-full">
        <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2 max-sm:text-xl">
          Para recuperar a sua senha, digite seu email abaixo:
        </h1>
      </div>
      <Input.Content
        label="Email"
        icon={<Icon name="AtSign" />}
        register={register("email")}
        error={errors.email}
        placeholder="Digite seu email"
      />
      <Button.Content type="submit" title="Enviar" />
    </form>
  );
}
