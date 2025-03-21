"use client";
import { Button } from "@/components/Button";
import { PageRoot } from "@/components/layout/PageRoot";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const navigation = useRouter();
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="ml-24 mt-6 mb-14">
          <h1 className="text-4xl font-semibold">Carrinho de compras</h1>
        </div>

        <div className="w-full items-center justify-center h-full flex ">
          <div className="w-[75%] h-[60%] flex justify-center items-center flex-col gap-8 border-x">
            <p>
              Ops!!! Parece que o seu carrinho está vazio... Continue procurando
              em nosso catálogo!
            </p>

            <Button.Root percentSize="30">
              <Button.Content
                title="CATÁLOGO"
                onclick={() => {
                  navigation.push("/catalog");
                }}
              />
            </Button.Root>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
