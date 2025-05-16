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
  return (
    <div
      className={`flex h-screen flex-col max-w-[100vw] ${
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
        <div className="flex-1 flex flex-col pt-[70px]">{children}</div>
      </div>
    </div>
  );
};
