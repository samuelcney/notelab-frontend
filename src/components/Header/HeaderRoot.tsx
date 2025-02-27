import Image from "next/image";
import { ReactNode } from "react";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  return (
    <div className="w-full h-[100px] border-b border-light-gray shadow-lg flex flex-row items-center px-6 gap-4 py-2">
      <Image
        src="/images/logo.png"
        width={46}
        height={46}
        alt="Logo"
        priority
      />
      {children}
    </div>
  );
};
