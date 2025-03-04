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
    <span className="cursor-pointer hover:bg-[#cdcdcd44] rounded-lg p-2 flex items-center gap-2 w-full">
      {icon}
      {isOpen && title && (
        <h1 className="text-base pt-1 text-white">{title}</h1>
      )}
    </span>
  );
};
