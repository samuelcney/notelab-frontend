import { JSX } from "react";

export const SidebarItem = ({
  icon,
  title,
  isOpen,
  onclick,
  isActive,
}: {
  icon: JSX.Element;
  title?: string;
  isOpen?: boolean;
  onclick?: () => void;
  isActive?: boolean;
}) => {
  return (
    <span
      className={`cursor-pointer hover:bg-[#cdcdcd22] rounded-lg px-2 py-4 flex items-center gap-2 group ${
        isActive ? "bg-[#cdcdcd22]" : ""
      }`}
      onClick={onclick}
    >
      {isOpen && icon}

      {title && isOpen && (
        <h1
          className={`text-base text-white transition-all duration-300 overflow-hidden`}
        >
          {title}
        </h1>
      )}
    </span>
  );
};
