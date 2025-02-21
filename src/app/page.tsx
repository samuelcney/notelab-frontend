import { Guitar } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="w-full flex flex-row h-full">
        <div className="w-1/2 h-full items-center justify-center flex">
          <Guitar size={400} className="hover:scale-[1.05] transition-all" />
        </div>
        <div className="w-1/2 h-full bg-foreground flex items-center justify-center">
          <h1 className="text-black text-2xl">Olá, seja bem vindo!</h1>
        </div>
      </div>
    </div>
  );
}
