"use client";

import { useModal } from "@/main/context/modal";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { Modal } from "@/presentation/components/modal/Modal";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Camera, Mail, Pencil, Phone, User2 } from "lucide-react";

export default function ProfilePage() {
  const user = useCurrentUser();

  const { openModal, isModalOpen, closeModal } = useModal();

  const renderAvatar = () => {
    if (user?.userBio?.avatarUrl === "") {
      return (
        <div className="w-full h-full bg-green-600 flex items-center justify-center">
          <h1 className="text-white font-bold uppercase text-4xl">
            {user?.name?.slice(0, 2)}
          </h1>
        </div>
      );
    }

    return (
      <img
        src={user?.userBio?.avatarUrl || "/images/default-avatar.png"}
        alt="avatar"
        className={`w-full h-full object-cover ${
          !user?.userBio?.avatarUrl ? "bg-green-500" : ""
        }`}
        width={144}
        height={144}
      />
    );
  };

  return (
    <PageRoot>
      <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
        <div className="w-full h-44 bg-gradient-to-r from-green-800 via-green-700 to-green-600 relative">
          <div className="absolute inset-0 opacity-20  bg-cover bg-center" />

          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-16 md:translate-x-0">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {renderAvatar()}
              </div>

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-all duration-200"
                onClick={() => openModal("profile")}
              >
                <Camera size={16} />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col px-4 md:px-16 pt-20 pb-8 gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{user?.name ?? "---"}</h1>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-green-600 hover:scale-[1.01] transition-transform"
              onClick={() => openModal("profile")}
            >
              <Pencil size={16} />
              <span className="hidden md:inline">Editar Perfil</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-foreground rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-green-600 border-b pb-2">
                Informações Pessoais
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <User2 size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium text-background">
                      {user?.name ?? "---"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <Mail size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-background">
                      {user?.email ?? "---"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium text-background">
                      {user?.userBio?.phone ?? "---"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t text-right">
                <span className="text-xs text-gray-500">
                  Última atualização:{" "}
                  <span className="italic">{user?.updatedAt}</span>
                </span>
              </div>
            </div>

            <div className="bg-foreground rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2">
              <h2 className="text-lg font-semibold mb-2 text-green-600 border-b pb-2">
                Sobre
              </h2>

              {user?.userBio?.bio ? (
                <p className="text-background leading-relaxed">
                  {user.userBio.bio}
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-background mb-3">
                    Nenhuma informação disponível
                  </p>
                  <button
                    className="text-sm text-green-600 hover:text-green-600 underline"
                    onClick={() => openModal("profile")}
                  >
                    Adicionar biografia
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal.Root isOpen={isModalOpen} onClose={closeModal}>
          <Modal.EditProfile user={user!} />
        </Modal.Root>
      )}
    </PageRoot>
  );
}
