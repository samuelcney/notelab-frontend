import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Footer } from "../Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageRoot = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-1 h-screen flex-col">
      <Header.Root>
        <Header.Content />
      </Header.Root>
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <div className="flex-1 flex h-full">{children}</div>
      </div>
    </div>
  );
};
