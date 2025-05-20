import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";

import { CourseContentSkeleton } from "@/presentation/components/course-details/CourseContentSkeleton";
import { Button } from "@/presentation/ui/button";
import { UserType } from "@/types/types";
import { getInitials } from "@/utils/Functions";

interface Props {
  data: {
    instructor: {
      name: string;
      email: string;
    };
    description: string;
  } | null;
  isPending: boolean;
  instructor?: UserType | null;
}

export const CourseInfo = ({ isPending, instructor, data }: Props) => {
  if (isPending) return <CourseContentSkeleton />;

  return (
    <>
      <div className="flex mt-8 w-full justify-center px-8">
        <div className="flex w-full justify-between gap-20 overflow-hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Instrutor:</h1>
            <AvatarBallComponent
              abbreviation={getInitials(data?.instructor?.name ?? "")}
              isBigSize
              user={instructor ?? ({} as UserType)}
            />
            <p className="text-sm">{data?.instructor?.name}</p>
            <p className="text-sm">{data?.instructor?.email}</p>
          </div>

          <div className="flex flex-col gap-6 flex-1 overflow-hidden">
            <div className=" flex flex-col gap-2 break-words ">
              <p className="flex-1 text-justify text-sm tracking-wide break-words">
                {data?.description}
              </p>
            </div>

            <Button
              title="ADICIONAR AO CARRINHO"
              className="w-full h-10 bg-greenApp text-white text-xl font-bold tracking-wide"
              variant="default"
            >
              ADICIONAR AO CARRINHO
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
