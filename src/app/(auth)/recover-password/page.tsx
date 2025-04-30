"use client";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/Icon";
import { Button } from "@/components/presentation/button";
import { Input } from "@/components/presentation/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const recoverPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
});

type recoverData = z.infer<typeof recoverPasswordSchema>;

export default function RecoverPasswordPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<recoverData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const handleRecoverPassword = async (data: recoverData) => {
    console.log(data);
  };

  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center font-semibold">
      <AnimatePresence>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-[65%] flex flex-col gap-5"
        >
          <form
            className="flex w-full h-full flex-col items-center justify-center gap-2"
            onSubmit={handleSubmit(handleRecoverPassword)}
          >
            <Input.Root isFullWidth>
              <div className="w-full">
                <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
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
            </Input.Root>

            <Button.Content title="Enviar" type="submit" className="mt-5" />

            <p
              className="text-xs underline mr-1 mt-3 text-foreground font-normal tracking-widest cursor-pointer"
              onClick={() => navigation.replace("/login")}
            >
              Clique aqui para voltar à tela de login
            </p>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
