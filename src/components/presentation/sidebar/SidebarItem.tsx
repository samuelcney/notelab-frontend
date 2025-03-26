import { JSX } from "react";

export const SidebarItem = ({
  icon,
  title,
  isOpen,
  onclick,
}: {
  icon: JSX.Element;
  title?: string;
  isOpen?: boolean;
  onclick?: () => void;
}) => {
  return (
    <span
      className={`cursor-pointer hover:bg-[#cdcdcd44] rounded-lg px-2 py-4 flex items-center gap-2 group`}
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
