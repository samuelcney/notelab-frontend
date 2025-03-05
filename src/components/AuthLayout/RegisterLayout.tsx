import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button";
import Icon from "../Icon";
import { Input } from "../Input";
import { useState } from "react";
import { z } from "zod";
import { registerSchema } from "@/schemas/register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/users/create-user.hook";

type RegisterData = z.infer<typeof registerSchema>;

export const RegisterLayout = ({ onToggle }: { onToggle: () => void }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { handleRegister, loading } = useRegister();

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
            onSubmit={handleSubmit((data) => handleRegister(data, onToggle))}
          >
            <Input.Root isFullWidth>
              <div className="w-full">
                <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
                  Eai, vamos começar?
                </h1>
                <h2 className="text-xl tracking-wide text-foreground font-normal ml-1">
                  Cadastre-se agora e faça parte da{" "}
                  <span className="text-greenApp tracking-widest font-extrabold">
                    NoteLab{" "}
                  </span>
                </h2>
              </div>

              <Input.Content
                label="Nome"
                icon={<Icon name="User" />}
                register={register("name")}
                error={errors.name}
              />

              <Input.Content
                label="Email"
                icon={<Icon name="AtSign" />}
                register={register("email")}
                error={errors.email}
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
              />
              <Input.Content
                label="Confirmar Senha"
                type={hidePassword ? "password" : "text"}
                icon={
                  <Icon
                    name={hidePassword ? "EyeClosed" : "Eye"}
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                }
                register={register("passwordConfirmation")}
                error={errors.passwordConfirmation}
              />
            </Input.Root>

            <Button.Root isFullSize>
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
