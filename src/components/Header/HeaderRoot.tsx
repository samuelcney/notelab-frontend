import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../Icon";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  return (
    <div className="w-full min-h-[70px] border-b border-light-gray flex flex-row items-center px-5 py-2 bg-dark-gray">
      <Icon
        name="Menu"
        className="text-white cursor-pointer ml-6"
        strokeWidth={1}
        size={46}
      />
      <div className="flex flex-row items-center ml-8 gap-1">
        <Image
          src="/images/logo.png"
          width={44}
          height={44}
          alt="Logo"
          className="mr-1"
          priority
        />
        <h1 className="text-3xl italic text-greenApp tracking-widest font-bold">
          NoteLab
        </h1>
      </div>

      {children}
    </div>
  );
};
