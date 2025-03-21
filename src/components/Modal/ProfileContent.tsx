"use client";
import { useModal } from "@/main/context/modal";
import { Badge } from "../Badges/Badge";
import { Button } from "../Button";

export const ProfileContent = () => {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-1 w-full justify-between flex-col">
      <div className="flex flex-col flex-1 p-1 gap-2 w-full">
        <h1 className="text-xl font-semibold tracking-wider">
          Dados da conta:
        </h1>
        <span className="w-full h-[1px] bg-light-gray" />
        <div className="w-full flex justify-end">
          <Badge.Role roleName="ADMIN" />
        </div>
        <div className="flex items-center w-full justify-center pt-4"></div>
      </div>

      <Button.Root>
        <Button.Content title="FECHAR" onclick={() => closeModal()} />
      </Button.Root>
    </div>
  );
};
