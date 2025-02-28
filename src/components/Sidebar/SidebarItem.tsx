import { ReactNode } from "react";

export const SidebarItem = ({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string;
}) => {
  return (
    <span className="cursor-pointer hover:bg-[#cdcdcd44] rounded-lg p-2 flex items-center gap-2 w-full">
      {children}
      <h1 className="text-base pt-1">{title}</h1>
    </span>
  );
};
