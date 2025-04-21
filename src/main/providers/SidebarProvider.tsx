"use client";
import { SidebarContext } from "@/main/context/sidebar";
import { ReactNode, useState } from "react";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);

  const closeSideBar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
