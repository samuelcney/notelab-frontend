import { pathNameEnum } from "@/utils/Enums";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="text-center space-y-4">
        <Image
          src={"/images/not-found.png"}
          alt={"Not Found"}
          width={500}
          height={500}
          quality={100}
          priority={true}
        />
        <h1 className="text-4xl font-bold text-greenApp">
          Página não encontrada - 404
        </h1>
        <p className="text-xl">
          A página que você tentou acessar não existe ou foi removida.
        </p>
        <a
          href={pathNameEnum.HOME}
          className="text-blue-600 underline mt-2 text-lg"
        >
          Voltar para o início
        </a>
      </div>
    </main>
  );
}
