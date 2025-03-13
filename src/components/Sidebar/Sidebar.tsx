"use client";
import { useSidebar } from "@/context/sidebar";
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

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, closeSideBar]);

  return (
    <div className="relative">
      <div
        ref={sidebarRef}
        className={`absolute left-0 top-0 h-full bg-dark-gray transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0 w-52" : "-translate-x-full w-52"}`}
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
            title="Catálogo"
            isOpen={isOpen}
            icon={
              <Icon
                name="BookAudio"
                strokeWidth={strokeW}
                size={size}
                color="white"
              />
            }
            onclick={() => {
              navigation.push("/catalog");
              closeSideBar();
            }}
          />
          <SidebarItem
            title="Usuários"
            isOpen={isOpen}
            icon={
              <Icon
                name="Users"
                strokeWidth={strokeW}
                size={size}
                color="white"
              />
            }
            onclick={() => {
              navigation.push("/admin/users");
              closeSideBar();
            }}
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
    </div>
  );
};
