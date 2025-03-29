"use client";
import React, { ReactNode } from "react";
import { Header } from "../presentation/header";
import { Sidebar } from "../presentation/sidebar/Sidebar";
import { useModal } from "@/main/context/modal";
import { Modal } from "../presentation/modal/Modal";

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

      {modalType === "profileModal" && (
        <Modal.ProfileRoot isOpen={isModalOpen} onClose={closeModal}>
          <Modal.ProfileContent />
        </Modal.ProfileRoot>
      )}
    </div>
  );
};
