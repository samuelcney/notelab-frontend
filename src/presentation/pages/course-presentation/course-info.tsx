"use client";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useAddItemCart } from "@/main/hooks/cart/use-add-item-cart";
import { useGetUserCart } from "@/main/hooks/cart/use-get-user-cart";
import { useGetItemAlreadyInCart } from "@/main/hooks/cart/use-item-alreadyIn-cart";
import { AlertBox } from "@/presentation/components/alert-dialog/AlertDialog";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";

import { CourseContentSkeleton } from "@/presentation/components/course-details/CourseContentSkeleton";
import { Button } from "@/presentation/ui/button";
import { CourseProps, UserType } from "@/types/types";
import { pathNameEnum } from "@/utils/Enums";
import { getInitials } from "@/utils/Functions";
import { useRouter } from "next/navigation";

interface Props {
  data: CourseProps;
  isPending: boolean;
  instructor?: UserType | null;
}

export const CourseInfo = ({ isPending, instructor, data }: Props) => {
  const { push } = useRouter();

  const currentUser = useCurrentUser();

  if (!currentUser) return null;

  const { data: cart } = useGetUserCart(currentUser?.id ?? "");
  const { mutateAsync: addItem, isPending: isLoading } = useAddItemCart();

  const { data: courseAlreadyInCart } = useGetItemAlreadyInCart(
    currentUser.id,
    String(data?.id)
  );

  const onSubmit = () => {
    addItem({
      courseId: data.id,
      cartId: cart?.id ?? "",
    });
  };

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

            {!courseAlreadyInCart ? (
              <AlertBox
                title="Adicionar item ao carrinho"
                description={`Você deseja adicionar o curso "${data.name}" ao seu carrinho?`}
                cancelText="Cancelar"
                actionText="Adicionar"
                onAction={onSubmit}
                loading={isLoading}
              >
                <Button
                  title="ADICIONAR AO CARRINHO"
                  className="w-full h-10 bg-green-500 text-white text-xl font-bold tracking-wide"
                  variant="default"
                  disabled={isLoading}
                >
                  ADICIONAR AO CARRINHO
                </Button>
              </AlertBox>
            ) : (
              <Button
                title="ADICIONAR AO CARRINHO"
                className="w-full h-10 bg-green-500 text-white text-xl font-bold tracking-wide"
                variant="default"
                disabled={isLoading}
                onClick={() => push(pathNameEnum.CART)}
              >
                JÁ ADICIONADO
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
