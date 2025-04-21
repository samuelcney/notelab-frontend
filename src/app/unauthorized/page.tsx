import { pathNameEnum } from "@/utils/Enums";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Image
          src={"/images/unauthorized.png"}
          alt={"Not Found"}
          width={500}
          height={500}
          quality={100}
          priority={true}
        />
        <h1 className="text-4xl font-bold text-greenApp">
          Acesso Negado - 401
        </h1>
        <p className="text-xl">
          Você não tem permissão para acessar esta página.
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
