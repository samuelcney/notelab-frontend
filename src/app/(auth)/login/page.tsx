"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/main/schemas/login.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/main/hooks/auth/use-login";
import { notify } from "@/components/presentation/toast/Toast";
import { Input } from "@/components/presentation/input";
import Icon from "@/components/Icon";
import { Button } from "@/components/presentation/button";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const { mutateAsync, isPending, error } = useLogin();
  const navigation = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    try {
      await mutateAsync(data);
    } catch {
      notify(error, "error");
    }
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
            className="flex w-full h-full flex-col items-center justify-center gap-5"
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <Input.Root isFullWidth>
              <div className="w-full">
                <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
                  Olá, bem vindo à plataforma{" "}
                  <span className="text-greenApp tracking-widest font-extrabold">
                    Notelab.io
                    <span className="text-foreground tracking-widest">!</span>
                  </span>
                </h1>
                <h2 className="text-xl tracking-wide text-foreground font-normal ml-1">
                  Faça seu login para entrar
                </h2>
              </div>

              <Input.Content
                label="Email"
                icon={<Icon name="AtSign" />}
                register={register("email")}
                error={errors.email}
                placeholder="Digite seu email"
              />
              <Input.Content
                label="Senha"
                type={hidePassword ? "password" : "text"}
                icon={
                  <Icon
                    name={hidePassword ? "EyeClosed" : "Eye"}
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                }
                register={register("password")}
                error={errors.password}
                placeholder="Digite sua senha"
              />

              <div className="w-full flex justify-end">
                <p className="text-xs underline mr-1 text-foreground font-normal tracking-widest cursor-pointer">
                  Esqueci minha senha
                </p>
              </div>
            </Input.Root>

            <Button.Root>
              <Button.Content
                title="Entrar"
                type="submit"
                isLoading={isPending}
              />

              <p
                className="text-xs underline mr-1 mt-3 text-foreground font-normal tracking-widest cursor-pointer"
                onClick={() => navigation.replace("/register")}
              >
                Ainda não possui uma conta? Clique aqui!
              </p>
            </Button.Root>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
