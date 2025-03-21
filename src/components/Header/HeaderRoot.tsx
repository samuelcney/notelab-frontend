"use client";
import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../Icon";
import { useSidebar } from "@/main/context/sidebar";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  const { openSidebar, isOpen, closeSideBar } = useSidebar();
  return (
    <div className="w-full min-h-[70px] border-b border-light-gray flex flex-row items-center px-3 py-2 bg-dark-gray">
      <Icon
        name="Menu"
        className="text-white cursor-pointer ml-6"
        strokeWidth={1}
        size={32}
        onClick={!isOpen ? openSidebar : closeSideBar}
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
          NoteLab.io
        </h1>
      </div>

      {children}
    </div>
  );
};
