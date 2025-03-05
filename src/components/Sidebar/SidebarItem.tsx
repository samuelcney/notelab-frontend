import { JSX } from "react";

export const SidebarItem = ({
  icon,
  title,
  isOpen,
}: {
  icon: JSX.Element;
  title?: string;
  isOpen?: boolean;
}) => {
  return (
    <span
      className={`cursor-pointer hover:bg-[#cdcdcd44] rounded-lg px-2 py-4 flex items-center gap-2 group ${
        !isOpen && "justify-center"
      }`}
    >
      {icon}
      {title && isOpen && (
        <h1
          className={`text-base text-white transition-all duration-300 overflow-hidden ${
            isOpen
              ? "opacity-100 w-auto translate-x-0"
              : "opacity-0 w-0 translate-x-[-10px]"
          }`}
        >
          {title}
        </h1>
      )}
    </span>
  );
};
