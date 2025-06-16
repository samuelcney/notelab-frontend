import { Button } from "@/presentation/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Logo isMobile={false} />
          <p className="text-gray-400 mt-4">
            Sua plataforma de aprendizado musical. Aprenda no seu ritmo com os
            melhores professores.
          </p>
          <div className="flex space-x-4 mt-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Facebook size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Instagram size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Twitter size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Youtube size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Notelab.io. Todos os direitos reservados.
      </div>
    </footer>
  );
}
