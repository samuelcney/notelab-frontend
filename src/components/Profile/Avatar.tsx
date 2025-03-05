"use client";
import { JSX, useState } from "react";
import Icon from "../Icon";
import { useRouter } from "next/navigation";

interface AvatarProps {
  abbreviation: string;
  isBigSize?: boolean;
}

export const Avatar = ({ abbreviation, isBigSize }: AvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useRouter();

  const size = isBigSize ? "w-[62px] h-[62px]" : "w-[46px] h-[46px]";
  const fontSize = isBigSize ? "text-2xl" : "text-xl";
  return (
    <div className="relative">
      <span
        className={`${size} rounded-full bg-greenApp flex items-center justify-center cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className={`${fontSize} text-white font-semibold tracking-wide`}>
          {abbreviation}
        </h1>
      </span>

      {isOpen && (
        <div
          className={`absolute right-0 mt-3 w-46 bg-background border border-light-gray rounded-lg shadow-lg z-10 animate-fade-in`}
        >
          <ul className="py-2">
            <MenuItem icon={<Icon name="User" />} label="Perfil" />
            <MenuItem icon={<Icon name="Settings" />} label="Configurações" />
            <MenuItem
              icon={<Icon name="LogOut" />}
              label="Sair"
              onclick={() => navigation.push("/")}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  onclick?: () => void;
}

const MenuItem = ({ icon, label, onclick }: MenuItemProps) => {
  return (
    <li
      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground cursor-pointer hover:bg-gray-600 transition-colors bg-background"
      onClick={onclick}
    >
      {icon}
      {label}
    </li>
  );
};
