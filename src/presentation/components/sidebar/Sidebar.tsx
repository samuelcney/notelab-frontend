"use client";
import { useSidebar } from "@/main/context/sidebar";
import Icon from "../Icon";

import { useCurrentUser } from "@/main/hooks/users/use-current-user";
import {
  adminPathNameEnum as adminPath,
  pathNameEnum as path,
  teacherPathNameEnum as teacherPath,
} from "@/utils/Enums";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const strokeW = 1.5;
  const size = 24;

  const { isOpen, closeSideBar } = useSidebar();
  const navigation = useRouter();
  const pathname = usePathname();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const user = useCurrentUser();
  const role = user?.app_metadata.role;

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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, closeSideBar]);

  return (
    <div className="relative">
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-[70px] h-[calc(100vh-70px)] bg-dark-gray transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}`}
      >
        <nav className="flex flex-col gap-4 w-full px-4 pt-6">
          <SidebarItem
            isActive={pathname === path.HOME}
            title="Início"
            isOpen={isOpen}
            icon={
              <Icon
                name="House"
                strokeWidth={strokeW}
                size={size}
                className="text-greenApp"
              />
            }
            onclick={() => {
              navigation.replace(path.HOME);
              closeSideBar();
            }}
          />

          <SidebarItem
            isActive={pathname === path.CATALOG}
            title="Catálogo"
            isOpen={isOpen}
            icon={
              <Icon
                name="Library"
                strokeWidth={strokeW}
                size={size}
                className="text-greenApp"
              />
            }
            onclick={() => {
              navigation.replace(path.CATALOG);
              closeSideBar();
            }}
          />

          {role === "INSTRUCTOR" ||
            (role === "ADMIN" && (
              <SidebarItem
                isActive={pathname === teacherPath.TEACHER_DASHBOARD}
                title="Ensino"
                isOpen={isOpen}
                icon={
                  <Icon
                    name="Presentation"
                    strokeWidth={strokeW}
                    size={size}
                    className="text-greenApp"
                  />
                }
                onclick={() => {
                  navigation.replace(teacherPath.TEACHER_DASHBOARD);
                  closeSideBar();
                }}
              />
            ))}

          {role === "ADMIN" && (
            <SidebarItem
              isActive={pathname === adminPath.ADMIN_USERS}
              title="Usuários"
              isOpen={isOpen}
              icon={
                <Icon
                  name="Users"
                  strokeWidth={strokeW}
                  size={size}
                  className="text-greenApp"
                />
              }
              onclick={() => {
                navigation.replace(adminPath.ADMIN_USERS);
                closeSideBar();
              }}
            />
          )}

          <SidebarItem
            isActive={pathname === path.CONFIGURATION}
            title="Configurações"
            isOpen={isOpen}
            icon={
              <Icon
                name="Settings"
                strokeWidth={strokeW}
                size={size}
                className="text-greenApp"
              />
            }
            onclick={() => {
              navigation.replace(path.CONFIGURATION);
              closeSideBar();
            }}
          />
        </nav>
      </div>
    </div>
  );
};
