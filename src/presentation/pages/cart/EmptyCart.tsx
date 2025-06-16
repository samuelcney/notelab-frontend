import { Button } from "@/presentation/components/button";
import { pathNameEnum } from "@/utils/Enums";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export const EmptyCart = () => {
  const navigation = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="rounded-2xl p-12 max-w-md">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-greenApp mb-4">
          Seu carrinho está vazio... 😢
        </h2>
        <p className="text-foreground mb-8 leading-relaxed">
          Explore nosso catálogo e encontre os melhores cursos para impulsionar
          seu aprendizado!
        </p>
        <Button.Root percentSize="100">
          <Button.Content
            title="EXPLORAR CATÁLOGO"
            onclick={() => navigation.push(pathNameEnum.CATALOG)}
            className="text-sm"
          />
        </Button.Root>
      </div>
    </div>
  );
};
