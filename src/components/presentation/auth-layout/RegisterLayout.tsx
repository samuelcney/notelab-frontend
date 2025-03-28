import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../button";
import Icon from "../../Icon";
import { Input } from "../input";
import { useState } from "react";
import { z } from "zod";
import { registerSchema } from "@/main/schemas/register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/main/hooks/users/useCreateUser";

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterLayout = ({ onToggle }: { onToggle: () => void }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const { mutate: handleRegister, isPending: loading } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center font-semibold">
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
            onSubmit={handleSubmit((data) =>
              handleRegister(data, { onSuccess: onToggle })
            )}
          >
            <Input.Root isFullWidth>
              <div className="w-full">
                <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
                  Eai, vamos começar?
                </h1>
                <h2 className="text-xl tracking-wide text-foreground font-normal ml-1">
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
              />

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
                placeholder="Crie uma senha segura"
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
              />
            </Input.Root>

            <Button.Root>
              <Button.Content title="Cadastrar" isLoading={loading} />

              <p
                className="text-xs underline mr-1 mt-3 text-foreground font-normal tracking-widest cursor-pointer"
                onClick={onToggle}
              >
                Já possui uma conta? Clique aqui para fazer o login!
              </p>
            </Button.Root>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
