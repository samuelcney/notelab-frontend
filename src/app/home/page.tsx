import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="flex flex-1 h-screen">
      <Header.Root>
        <Header.Content />
      </Header.Root>
    </div>
  );
}
