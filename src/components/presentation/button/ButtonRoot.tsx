import { ReactNode } from "react";

interface ButtonRootProps {
  children: ReactNode;
  percentSize?: string;
  isRow?: boolean;
}

export const ButtonRoot = ({
  children,
  percentSize,
  isRow,
  ...rest
}: ButtonRootProps) => {
  const isFlexRow = isRow ? "flex-row" : "flex-col";
  const percent = percentSize ? `w-[${percentSize}%]` : "w-full";

  return (
    <div className={`flex items-center ${isFlexRow} ${percent}`} {...rest}>
      {children}
    </div>
  );
};
