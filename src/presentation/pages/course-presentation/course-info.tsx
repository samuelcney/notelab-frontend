"use client";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useAddItemCart } from "@/main/hooks/cart/use-add-item-cart";
import { useGetUserCart } from "@/main/hooks/cart/use-get-user-cart";
import { useGetItemAlreadyInCart } from "@/main/hooks/cart/use-item-alreadyIn-cart";
import { useGetEnrollmentsByUserId } from "@/main/hooks/enrollments/use-get-enrollments";
import { AlertBox } from "@/presentation/components/alert-dialog/AlertDialog";
import { AvatarBallComponent } from "@/presentation/components/avatar-profile/AvatarBallComponent";

import { CourseContentSkeleton } from "@/presentation/components/course-details/CourseContentSkeleton";
import { Button } from "@/presentation/ui/button";
import { Separator } from "@/presentation/ui/separator";
import { CourseProps, UserType } from "@/types/types";
import { pathNameEnum } from "@/utils/Enums";
import { getInitials } from "@/utils/Functions";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

interface Props {
  data: CourseProps;
  isPending: boolean;
  instructor?: UserType | null;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export const CourseInfo = ({ isPending, instructor, data }: Props) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";
  const { push } = useRouter();
  const currentUser = useCurrentUser();

  const { data: enrollments } = useGetEnrollmentsByUserId(
    currentUser?.id ?? ""
  );

  const alreadyHasEnrollment = enrollments?.some(
    (enrollment) => enrollment.courseId === data?.id
  );

  const { data: cart } = useGetUserCart(currentUser?.id ?? "");
  const { mutateAsync: addItem, isPending: isLoading } = useAddItemCart();

  const { data: courseAlreadyInCart } = useGetItemAlreadyInCart(
    currentUser?.id ?? "",
    String(data?.id)
  );

  const onSubmit = () => {
    addItem({
      courseId: data.id,
      cartId: cart?.id ?? "",
    });
  };

  if (!currentUser) return null;
  if (isPending) return <CourseContentSkeleton />;

  return (
    <>
      <div className="flex mt-8 w-full justify-center px-8">
        <div className="flex w-full justify-between gap-16 overflow-hidden">
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

          <Separator className="w-[1px] h-full bg-foreground" />

          <div className="flex flex-col gap-6 flex-1 overflow-hidden">
            <MDEditor
              value={data?.description ?? ""}
              preview="preview"
              hideToolbar
              className="w-full min-h-[400px] bg-background overflow-y-auto rounded-lg p-4"
              data-color-mode={currentTheme === "dark" ? "dark" : "light"}
            />

            {!courseAlreadyInCart ? (
              alreadyHasEnrollment ? (
                <Button
                  className="w-full h-10 bg-green-500 text-white text-xl font-bold tracking-wide"
                  variant="default"
                  disabled={isLoading}
                  onClick={() => push(pathNameEnum.MY_COURSES)}
                >
                  VOCÊ JÁ POSSUI ESTE CURSO
                </Button>
              ) : (
                <AlertBox
                  title="Adicionar item ao carrinho"
                  description={`Você deseja adicionar o curso "${data.name}" ao seu carrinho?`}
                  cancelText="Cancelar"
                  actionText="Adicionar"
                  onAction={onSubmit}
                  loading={isLoading}
                >
                  <Button
                    className="w-full h-10 bg-green-500 text-white text-xl font-bold tracking-wide"
                    variant="default"
                    disabled={isLoading}
                  >
                    ADICIONAR AO CARRINHO
                  </Button>
                </AlertBox>
              )
            ) : (
              <Button
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
