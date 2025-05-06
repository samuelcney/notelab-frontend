"use client";
import { useCurrentUser } from "@/main/hooks/users/use-current-user";
import { useUserProfileStore } from "@/main/stores/user-profile-store";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { Input } from "@/presentation/ui/input";

export default function ProfilePage() {
  const user = useCurrentUser();
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
    name: user?.user_metadata.name,
    email: user?.email,
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, quidem blanditiis aspernatur expedita nemo quas cumque illum iste laborum beatae officia quibusdam enim quis veniam libero quasi minus eos id?",
    phone: "(11) 99999-9999",
    avatarUrl: "",
  };

  return (
    <PageRoot>
      <div className="flex flex-col w-full h-full p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-10">Meu perfil</h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            {userData.avatarUrl ? (
              <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
                <img
                  src={userData.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : (
              <AvatarBallComponent
                abbreviation={userData.name!}
                isBigSize
                className="w-20 h-20"
              />
            )}

            <Input type="file" accept="image/*" className="" />
          </div>

          <div className="flex-1 w-full space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                defaultValue={userData.name}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                defaultValue={userData.phone}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                defaultValue={userData.bio}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="pt-2">
              <button className="bg-greenApp text-white px-6 py-2 rounded-md hover:bg-greenApp/70 transition duration-200 font-bold">
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
