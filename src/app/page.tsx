import { Button } from "@/components/Button";
import Icon from "@/components/Icon/Icon";
import ImageSlideshow from "@/components/ImageSlideshow/ImageSlideShow";
import { Input } from "@/components/Input";

export default function Home() {
  return (
    <div className="w-full flex flex-row h-screen relative">
      <div className="w-1/2 relative">
        <ImageSlideshow />
      </div>
      <div className="w-1/2 h-full bg-background flex items-center justify-center">
        <div className="w-[90%] h-[90%] flex flex-col justify-center items-center gap-8 font-semibold">
          <h1 className="text-2xl tracking-wide">Faça seu login para entrar</h1>

          <Input.Root>
            <Input.Content label="Email" icon={<Icon name="AtSign" />} />
            <Input.Content label="Senha" icon={<Icon name="Lock" />} />

            <div className="w-full flex justify-end font-normal">
              <p className="text-sm underline mr-1">Esqueci minha senha</p>
            </div>
          </Input.Root>

          <Button.Root>
            <Button.Content title="entrar" />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
