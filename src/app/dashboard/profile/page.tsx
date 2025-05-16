"use client";
import { useModal } from "@/main/context/modal";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useUserProfileStore } from "@/main/stores/user-profile-store";
import { Modal } from "@/presentation/components/modal/Modal";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Mail, Pencil, Phone, User2 } from "lucide-react";

export default function ProfilePage() {
  const user = useCurrentUser();
  const { setAvatarUrl } = useUserProfileStore();
  const { openModal, isModalOpen, closeModal } = useModal();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageRoot>
      <div className="flex flex-col w-full h-full bg-background text-foreground">
        <div className="w-full h-[35%] bg-gradient-to-r from-green-800 to-green-700 py-16 px-6 md:px-12 relative">
          <div className="w-44 h-44 rounded-full ml-16 absolute top-56 bg-green-500 flex justify-center items-center overflow-hidden shadow-lg border-4 border-white">
            {user?.userBio?.avatarUrl === "" ? (
              <h1 className="text-white font-bold uppercase text-4xl">
                {user?.name?.slice(0, 2)}
              </h1>
            ) : (
              <img
                src={user?.userBio?.avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover items-center justify-center flex"
                width={144}
                height={144}
              />
            )}
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col md:flex-row p-6 pt-28 md:pt-32 gap-8">
          <div className="border w-full md:w-1/3 h-fit rounded-xl p-6 shadow-md relative border-foreground">
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-green-700 transition-colors"
              onClick={() => openModal("profile")}
            >
              <Pencil size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
            <div className="flex items-center gap-3 mb-3">
              <User2 className="text-green-700" />
              <span>{user?.name ?? "---"}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-green-700" />
              <span>{user?.email ?? "---"}</span>
            </div>
            <div className="flex items-center gap-3 mb-10">
              <Phone className="text-green-700" />
              <span>{user?.userBio?.phone ?? "---"}</span>
            </div>

            <div className="w-full flex items-center justify-end">
              <span className="text-sm text-muted-foreground">
                Última atualização:{" "}
                <span className="italic text-sm text-muted-foreground">
                  {user?.createdAt}
                </span>
              </span>
            </div>
          </div>
          <div className="border w-full md:w-2/3 h-fit rounded-xl p-6 shadow-md relative border-foreground">
            <h2 className="text-xl font-semibold mb-4">Sobre</h2>
            <p className="text-muted-foreground leading-relaxed">
              {user?.userBio?.bio ?? "---"}
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal.Root isOpen={isModalOpen} onClose={closeModal}>
          <Modal.EditProfile />
        </Modal.Root>
      )}
    </PageRoot>
  );
}
