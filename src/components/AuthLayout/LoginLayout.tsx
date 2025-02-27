import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button";
import Icon from "../Icon";
import { Input } from "../Input";
import { useState } from "react";
import { notify } from "../Toast/Toast";
import { useRouter } from "next/navigation";

interface LoginLayoutProps {
  ontoggle?: () => void;
}

export const LoginLayout = ({ ontoggle }: LoginLayoutProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useRouter();
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
          <Input.Root isFullWidth>
            <div className="w-full">
              <h1 className="text-2xl tracking-wide text-foreground flex flex-wrap gap-2">
                Olá, bem vindo à{" "}
                <span className="text-greenApp tracking-widest font-extrabold">
                  NoteLab
                  <span className="text-foreground tracking-widest">!</span>
                </span>
              </h1>
              <h2 className="text-xl tracking-wide text-foreground font-normal ml-1">
                Faça seu login para entrar
              </h2>
            </div>

            <Input.Content label="Email" icon={<Icon name="AtSign" />} />
            <Input.Content
              label="Senha"
              type={hidePassword ? "password" : "text"}
              icon={
                <Icon
                  name={hidePassword ? "EyeClosed" : "Eye"}
                  onClick={() => setHidePassword(!hidePassword)}
                />
              }
            />

            <div className="w-full flex justify-end">
              <p className="text-xs underline mr-1 text-foreground font-normal tracking-widest cursor-pointer">
                Esqueci minha senha
              </p>
            </div>
          </Input.Root>

          <Button.Root isFullSize>
            <Button.Content
              title="Entrar"
              onclick={() => navigation.push("/home")}
            />

            <p
              className="text-xs underline mr-1 mt-3 text-foreground font-normal tracking-widest cursor-pointer"
              onClick={ontoggle}
            >
              Ainda não possui uma conta? Clique aqui!
            </p>
          </Button.Root>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
