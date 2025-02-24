import { ReactNode } from "react";

interface ButtonRootProps {
  children: ReactNode;
  isFullSize?: boolean;
  isRow?: boolean;
}

export const ButtonRoot = ({
  children,
  isFullSize,
  isRow,
}: ButtonRootProps) => {
  const isFlexRow = isRow ? "flex-row" : "flex-col";
  const size = isFullSize ? "w-full" : "w-[60%]";

  return (
    <div className={`flex items-center ${isFlexRow} ${size}`}>{children}</div>
  );
};
