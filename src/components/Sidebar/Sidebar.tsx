"use client";
import { useSidebar } from "@/context/SidebarContext";
import Icon from "../Icon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const strokeW = 1.5;
  const size = 24;

  const { isOpen } = useSidebar();

  return (
    <div
      className={`bg-dark-gray h-full border-r border-light-gray ${
        isOpen ? "w-64" : "w-24"
      } transition-all duration-300`}
    >
      <nav className="flex flex-col gap-6 w-full px-6 pt-6">
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
