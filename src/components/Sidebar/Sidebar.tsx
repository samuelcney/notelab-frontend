"use client";
import { useSidebar } from "@/context/SidebarContext";
import Icon from "../Icon";
import { SidebarItem } from "./SidebarItem";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const Sidebar = () => {
  const strokeW = 1.5;
  const size = 24;

  const { isOpen, closeSideBar } = useSidebar();
  const navigation = useRouter();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSideBar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSideBar]);

  return (
    <div
      ref={sidebarRef}
      className={`bg-dark-gray h-full transition-all duration-300 ${
        isOpen ? "w-52 border-r border-light-gray" : "w-0"
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
          onclick={() => {
            navigation.push("/home");
            closeSideBar();
          }}
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
