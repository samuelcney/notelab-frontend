"use client";
import { useSidebar } from "@/main/context/sidebar";
import { pathNameEnum } from "@/utils/Enums";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Icon from "../Icon";
import { Logo } from "../Logo";

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
        className="flex flex-row items-center ml-4"
        onClick={() => push(pathNameEnum.HOME)}
        style={{ cursor: "pointer" }}
      >
        <Logo />
      </div>

      {children}
    </div>
  );
};
