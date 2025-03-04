"use client";
import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../Icon";
import { useSidebar } from "@/context/SidebarContext";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="w-full min-h-[70px] border-b border-light-gray flex flex-row items-center px-5 py-2 bg-dark-gray">
      <Icon
        name="Menu"
        className="text-white cursor-pointer ml-6"
        strokeWidth={1}
        size={46}
        onClick={toggleSidebar}
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
        <h1 className="text-2xl italic text-greenApp tracking-widest font-bold">
          NoteLab
        </h1>
      </div>

      {children}
    </div>
  );
};
