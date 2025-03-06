"use client";
import { useSidebar } from "@/context/SidebarContext";
import Icon from "../Icon";
import { SidebarItem } from "./SidebarItem";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const strokeW = 1.5;
  const size = 24;

  const { isOpen } = useSidebar();
  const navigation = useRouter();

  return (
    <div
      className={`bg-dark-gray h-full border-r border-light-gray transition-all duration-300 ${
        isOpen ? "w-52" : "w-20"
      }`}
    >
      <nav className="flex flex-col gap-4 w-full px-4 pt-6">
        <SidebarItem
          title="Início"
          isOpen={isOpen}
          icon={
            <Icon
              name="House"
              strokeWidth={strokeW}
              size={size}
              color="white"
            />
          }
          onclick={() => navigation.push("/home")}
        />
        <SidebarItem
          title="Cursos"
          isOpen={isOpen}
          icon={
            <Icon
              name="BookAudio"
              strokeWidth={strokeW}
              size={size}
              color="white"
            />
          }
        />
        <SidebarItem
          title="Configurações"
          isOpen={isOpen}
          icon={
            <Icon
              name="Settings"
              strokeWidth={strokeW}
              size={size}
              color="white"
            />
          }
        />
      </nav>
    </div>
  );
};
