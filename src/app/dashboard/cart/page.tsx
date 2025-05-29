"use client";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetUserCart } from "@/main/hooks/cart/use-get-user-cart";
import { useRemoveItemCart } from "@/main/hooks/cart/use-remove-item-cart";
import { AlertBox } from "@/presentation/components/alert-dialog/AlertDialog";
import { CourseCatalogCard } from "@/presentation/components/course-card/CourseCatalogCard";
import { PageRoot } from "@/presentation/layout/PageRoot";
import { EmptyCart } from "@/presentation/pages/cart/EmptyCart";
import { pathNameEnum } from "@/utils/Enums";
import { ArrowLeft, CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const navigation = useRouter();
  const user = useCurrentUser();

  if (!user) return null;

  const { data, isPending } = useGetUserCart(user.id);

  const { mutateAsync: removeItem } = useRemoveItemCart();

  const cartItems = data?.cartItems || [];
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.course.price,
    0
  );
  const itemCount = cartItems.length;

  const handleRemoveItem = async (courseId: string) => {
    await removeItem({ cartId: data?.id || "", courseId });
  };

  const handleCheckout = () => {};

  if (isPending) {
    return (
      <PageRoot>
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="text-2xl text-foreground">Carregando carrinho...</div>
        </div>
      </PageRoot>
    );
  }

  return (
    <PageRoot>
      <div className="flex flex-1 w-full min-h-screen ">
        <div className="mx-8 px-4 py-8 w-full">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigation.back()}
              className="p-2 hover:bg-green-500 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              {itemCount > 0 && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </span>
              )}
            </div>
          </div>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Itens no Carrinho
                </h2>
                {cartItems.map((item, index) => (
                  <div
                    key={item.course.id + index}
                    className="rounded-xl shadow-sm border border-gray-200 p-2 relative group hover:shadow-md transition-shadow"
                  >
                    <button
                      className="absolute top-0 right-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Remover item"
                    >
                      <AlertBox
                        key={item.course.id}
                        title="Remover Curso do Carrinho"
                        description="Você tem certeza que deseja remover este curso do seu carrinho?"
                        onAction={() => handleRemoveItem(item.course.id)}
                        cancelText="Cancelar"
                        actionText="Remover"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </AlertBox>
                    </button>

                    <CourseCatalogCard
                      name={item.course.name}
                      description={item.course.description}
                      categories={item.course.categories}
                      instructorId={item.course.instructorId}
                      price={item.course.price}
                      difficulty={item.course.difficulty}
                      id={item.course.id}
                      coverImage={item.course.coverImage}
                    />
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="rounded-xl shadow-sm border border-foreground  p-6 sticky top-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Resumo do Pedido
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between ">
                      <span>
                        Subtotal ({itemCount}{" "}
                        {itemCount === 1 ? "item" : "itens"})
                      </span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Desconto</span>
                      <span className="text-green-600">- R$ 0,00</span>
                    </div>
                    <hr className="border border-foreground" />
                    <div className="flex justify-between text-lg font-semibold text-foreground">
                      <span>Total</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-bold"
                    >
                      <CreditCard className="w-5 h-5" />
                      Finalizar Compra
                    </button>

                    <button
                      onClick={() => navigation.push(pathNameEnum.CATALOG)}
                      className="w-full bg-background hover:opacity-[80%] text-foreground font-medium py-3 px-4 rounded-lg transition-colors border border-foreground"
                    >
                      Continuar Comprando
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t  border-foreground">
                    <div className="text-sm text-gray-400 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Acesso vitalício aos cursos</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Suporte 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageRoot>
  );
}
