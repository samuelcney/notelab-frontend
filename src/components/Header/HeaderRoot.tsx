import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../Icon";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  return (
    <div className="w-full min-h-[70px] border-b border-light-gray shadow-lg flex flex-row items-center px-5 gap-4 py-2 bg-dark-gray">
      <Image
        src="/images/logo.png"
        width={46}
        height={46}
        alt="Logo"
        className="mr-1"
        priority
      />

      {/* <Icon
        name="Menu"
        className="text-white cursor-pointer ml-1"
        strokeWidth={1}
        size={34}
      /> */}

      {children}
    </div>
  );
};
