import { Music } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Music className="h-6 w-6 text-green-500" />
      <span className="text-xl font-bold text-white">
        Notelab<span className="text-green-500">.io</span>
      </span>
    </div>
  );
}
