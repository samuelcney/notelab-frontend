import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="flex flex-1 h-screen flex-col">
      <Header.Root>
        <Header.Content />
      </Header.Root>

      <div className="w-full flex flex-1 flex-col items-center">
        <div className="bg-background w-[80%] flex flex-1 "></div>
      </div>
    </div>
  );
}
