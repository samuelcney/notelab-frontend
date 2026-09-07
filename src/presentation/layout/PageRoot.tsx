"use client";
import { ReactNode } from "react";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar/Sidebar";

interface PageLayoutProps {
  children: ReactNode;
  haveSearchBar?: boolean;
  isOverflowHidden?: boolean;
}

export const PageRoot = ({
  children,
  haveSearchBar = false,
  isOverflowHidden = false,
}: PageLayoutProps) => {
  // h-dvh: no mobile a barra de URL faz 100vh estourar a área visível.
  return (
    <div
      className={`flex h-dvh flex-col max-w-full ${
        isOverflowHidden ? "overflow-hidden" : "overflow-x-hidden"
      }`}
    >
      <Header.Root>
        <Header.Content haveSearchBar={haveSearchBar} />
      </Header.Root>
      <div
        className={`flex flex-1 flex-row h-full ${
          isOverflowHidden ? "overflow-hidden" : ""
        }`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col pt-[70px] overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
