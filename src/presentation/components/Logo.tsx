import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center">
      {/* <Music className="h-6 w-6 text-green-500" /> */}
      <Image
        src={"/images/logo.png"}
        alt="Notelab Logo"
        width={52}
        height={52}
      />
      <span className="text-xl font-bold text-white">
        Notelab<span className="text-green-500">.io</span>
      </span>
    </div>
  );
}
