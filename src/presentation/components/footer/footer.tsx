import { Button } from "@/presentation/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "../Logo";

export function Footer() {
  // const { data: categories } = useGetCategories();
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Logo />
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

        {/* <div>
          <h3 className="font-bold text-white mb-4">Cursos</h3>
          <ul className="space-y-2">
            {categories?.map((item) => (
              <li key={item.id}>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-green-400 p-0 h-auto"
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </div> */}

        {/* <div>
          <h3 className="font-bold text-white mb-4">Links Úteis</h3>
          <ul className="space-y-2">
            {["Sobre Nós", "Contato", "FAQ"].map((item) => (
              <li key={item}>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-green-400 p-0 h-auto"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div> */}

        {/* <div>
          <h3 className="font-bold text-white mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Receba novidades e dicas exclusivas
          </p>
          <div className="flex flex-col space-y-2">
            <Input
              placeholder="Seu email"
              className="bg-gray-900 border-gray-700"
            />
            <Button className="bg-green-500 hover:bg-green-600">
              Inscrever-se
            </Button>
          </div>
        </div> */}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Notelab.io. Todos os direitos reservados.
      </div>
    </footer>
  );
}
