"use client";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import Icon from "../../Icon";
import { useSidebar } from "@/main/context/sidebar";
import { useRouter } from "next/navigation";

interface HeaderRootProps {
  children?: ReactNode;
}

export const HeaderRoot = ({ children }: HeaderRootProps) => {
  const { openSidebar, isOpen, closeSideBar } = useSidebar();
  const { push } = useRouter();

  return (
    <div className="w-full min-h-[70px] border-b border-light-gray flex flex-row items-center px-3 py-2 bg-dark-gray z-30 fixed top-0 left-0">
      <button>
        <Icon
          name="Menu"
          className="text-white cursor-pointer ml-6"
          strokeWidth={1}
          size={32}
          onClick={(event) => {
            event.stopPropagation();
            !isOpen ? openSidebar() : closeSideBar();
          }}
        />
      </button>

      <div
        className="flex flex-row items-center ml-8 gap-1"
        onClick={() => push("/home")}
        style={{ cursor: "pointer" }}
      >
        {/* <Image
          src="/images/logo.png"
          width={44}
          height={44}
          alt="Logo"
          className="mr-1"
          priority
        /> */}
        <h1 className="text-2xl text-greenApp tracking-[0.15em] font-extrabold">
          Notelab.io
        </h1>
      </div>

      {children}
    </div>
  );
};
