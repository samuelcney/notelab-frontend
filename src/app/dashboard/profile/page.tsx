"use client";
import { useCurrentUser } from "@/main/hooks/users/use-current-user";
import { useUserProfileStore } from "@/main/stores/user-profile-store";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useCurrentUser();
  const { setAvatarUrl } = useUserProfileStore();

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

  const userData = {
    name: user?.name,
    email: user?.email,
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quidem blanditiis aspernatur expedita nemo quas cumque illum iste laborum beatae officia quibusdam enim quis veniam libero quasi minus eos id?",
    phone: "(11) 99999-9999",
    avatarUrl: user?.info.avatarUrl,
  };

  return (
    <PageRoot>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-[25%] bg-gradient-to-r from-green-800 to-green-700 py-16 px-6 md:px-12 relative">
          <div className="w-36 h-36 rounded-full ml-16 absolute top-36 bg-green-500 flex justify-center items-center overflow-hidden">
            {user?.info.avatarUrl === "" ? (
              <h1 className="text-white font-bold uppercase text-4xl">
                {userData.name?.slice(0, 2)}
              </h1>
            ) : isLoading ? (
              <Loader2 className="animate-spin w-10 h-10" />
            ) : (
              <img
                src={`${user?.info?.avatarUrl}`}
                alt="Imagem do usuário"
                className="w-full h-full object-cover"
                width={144}
                height={144}
              />
            )}
          </div>
        </div>

        <div className="w-full flex-1 flex p-10">
          <div className="border border-foreground w-full h-full rounded-r rounded-l ">
            a
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
