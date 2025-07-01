"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useRegister } from "@/main/hooks";
import { registerSchema } from "@/main/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Icon from "@/presentation/components/Icon";
import { Button } from "@/presentation/components/button";
import { Input } from "@/presentation/components/input";
import { Label } from "@/presentation/ui/label";
import { RadioGroup, RadioGroupItem } from "@/presentation/ui/radio-group";
import { useRouter } from "next/navigation";

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const { mutate: handleRegister, isPending: loading } = useRegister();
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-semibold">
      <AnimatePresence>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-[70%] flex flex-col"
        >
          <form
            className="flex w-full h-full flex-col items-center justify-center gap-5"
            onSubmit={handleSubmit((data) => handleRegister(data))}
          >
            <Input.Root isFullWidth>
              <div className="w-full">
                <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2 pt-10 max-sm:text-xl">
                  Eai, vamos começar?
                </h1>
                <h2 className="text-xl tracking-wide text-foreground font-normal sm:ml-1">
                  Cadastre-se agora e faça parte da{" "}
                  <span className="text-greenApp tracking-widest font-extrabold">
                    Notelab.io
                  </span>
                </h2>
              </div>

              <Input.Content
                label="Nome"
                icon={<Icon name="User" />}
                register={register("name")}
                error={errors.name}
                placeholder="Digite seu nome completo"
                isSmallHeight
              />

              <Input.Content
                label="Email"
                icon={<Icon name="AtSign" />}
                register={register("email")}
                error={errors.email}
                placeholder="Digite seu email"
                isSmallHeight
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
                placeholder="Crie uma senha segura"
                isSmallHeight
              />
              <Input.Content
                label="Confirmar Senha"
                type={hideConfirmPassword ? "password" : "text"}
                icon={
                  <Icon
                    name={hideConfirmPassword ? "EyeClosed" : "Eye"}
                    onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                  />
                }
                register={register("passwordConfirmation")}
                error={errors.passwordConfirmation}
                placeholder="Repita sua senha"
                isSmallHeight
              />

              <Controller
                control={control}
                name="role"
                defaultValue="STUDENT"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full flex flex-row"
                  >
                    <Label className="text-sm font-semibold text-foreground mr-2">
                      Você é:
                    </Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="STUDENT" id="STUDENT" />
                      <Label htmlFor="STUDENT">Estudante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="INSTRUCTOR" id="INSTRUCTOR" />
                      <Label htmlFor="INSTRUCTOR">Professor</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </Input.Root>

            <Button.Root>
              <Button.Content title="Cadastrar" isLoading={loading} />

              <p
                className="text-xs underline mr-1 mt-3 text-foreground font-normal tracking-widest cursor-pointer text-center"
                onClick={() => replace("/login")}
              >
                Já possui uma conta? Clique aqui para fazer o login!
              </p>
            </Button.Root>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
