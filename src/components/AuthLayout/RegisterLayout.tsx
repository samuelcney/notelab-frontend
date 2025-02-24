import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../Button";
import Icon from "../Icon/Icon";
import { Input } from "../Input";
import { useState } from "react";
import { notify } from "../Toast/Toast";

interface RegisterLayoutProps {
  ontoggle?: () => void;
}

export const RegisterLayout = ({ ontoggle }: RegisterLayoutProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center font-semibold">
      <AnimatePresence>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-[70%] flex flex-col gap-5"
        >
          <Input.Root isFullWidth>
            <div className="w-full">
              <h1 className="text-xl tracking-wide text-background flex flex-wrap gap-2">
                Eai, vamos começar?
              </h1>
              <h2 className="text-lg tracking-wide text-background font-normal ml-1">
                Cadastre-se agora e faça parte da{" "}
                <span className="text-light-green tracking-widest font-bold">
                  IntelliMusic
                </span>
                !
              </h2>
            </div>

            <Input.Content label="Nome" icon={<Icon name="User" />} />

            <Input.Content label="Email" icon={<Icon name="AtSign" />} />
            <Input.Content
              label="Senha"
              type={hidePassword ? "password" : "text"}
              icon={
                <Icon
                  name={hidePassword ? "Lock" : "LockOpen"}
                  onClick={() => setHidePassword(!hidePassword)}
                />
              }
            />
            <Input.Content
              label="Confirmar Senha"
              type={hidePassword ? "password" : "text"}
              icon={
                <Icon
                  name={hidePassword ? "Lock" : "LockOpen"}
                  onClick={() => setHidePassword(!hidePassword)}
                />
              }
            />
          </Input.Root>

          <Button.Root isFullSize>
            <Button.Content
              title="Cadastrar"
              onclick={() => {
                notify("Cadastro efetuado com sucesso!", "success");
              }}
            />

            <p
              className="text-xs underline mr-1 mt-3 text-background font-normal tracking-widest cursor-pointer"
              onClick={ontoggle}
            >
              Já possui uma conta? Clique aqui para fazer o login!
            </p>
          </Button.Root>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
