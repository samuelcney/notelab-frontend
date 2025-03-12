"use client";
import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Modal } from "../Modal/Modal";
import { useModal } from "@/context/modal";
import { Input } from "../Input";
import { Button } from "../Button";

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
  const { isModalOpen, closeModal, modalType, modalProps } = useModal();

  return (
    <div
      className={`flex flex-1 h-screen flex-col max-w-[100vw] ${
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
        <div className="flex-1 flex">{children}</div>
      </div>

      {modalType === "profileModal" && (
        <Modal.ProfileRoot isOpen={isModalOpen} onClose={closeModal}>
          <Modal.ProfileContent />
        </Modal.ProfileRoot>
      )}
    </div>
  );
};
