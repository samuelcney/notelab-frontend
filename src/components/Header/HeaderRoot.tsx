import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../Icon";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  return (
    <div className="w-full h-[100px] border-b border-light-gray shadow-lg flex flex-row items-center px-5 gap-4 py-2">
      {/* <Image
        src="/images/logo.png"
        width={46}
        height={46}
        alt="Logo"
        priority
      /> */}
      <span className="mr-1 size-[46px] rounded-full cursor-pointer hover:bg-[#15803d99] flex items-center justify-center">
        <Icon
          name="AlignJustify"
          className="text-greenApp"
          strokeWidth={1}
          size={32}
        />
      </span>

      {children}
    </div>
  );
};
