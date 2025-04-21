"use client";
import { PageRoot } from "@/components/layout/PageRoot";
import { AvatarBallComponent } from "@/components/presentation/avatar-profile/AvatarBallComponent";
import { CarouselContainer } from "@/components/presentation/carousel/CarouselContainer";
import { useCurrentUser } from "@/main/hooks/users/use-current-user";

export default function HomePage() {
  const user = useCurrentUser();
  return (
    <PageRoot>
      <div className="flex flex-1 flex-col mt-14 items-center">
        <div className="flex gap-4 mb-14 w-full pl-8">
          <AvatarBallComponent
            abbreviation={user!.user_metadata.name}
            isBigSize
          />
          <h1 className="text-2xl font-semibold flex items-center tracking-wide">
            Bem vindo(a) de volta, {user?.user_metadata.name}
          </h1>
        </div>

        <CarouselContainer />
      </div>
    </PageRoot>
  );
}
