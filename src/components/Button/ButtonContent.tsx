import { ButtonHTMLAttributes } from "react";
import Icon from "../Icons/Icon";

interface ButtonContentProps {
  title: string;
  onclick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isLoading?: boolean;
  isSmallHeight?: boolean;
}

export const ButtonContent = ({
  title,
  onclick,
  type,
  isLoading,
  isSmallHeight,
}: ButtonContentProps) => {
  return (
    <div className="w-full">
      <button
        className={`w-full bg -green rounded-xl flex items-center justify-center font-bold text-lg tracking-wide transition-transform duration-300 hover:scale-[1.03] focus:ring-2 focus:ring-[--highlight] disabled:opacity-60 disabled:cursor-not-allowed text-foreground ${
          isSmallHeight ? "h-8" : "h-12"
        }`}
        onClick={onclick}
        type={type}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon name="LoaderCircle" className="animate-spin" size={20} />
        ) : (
          <span>
            <h1 className="tracking-widest font-extrabold text-xl">{title}</h1>
          </span>
        )}
      </button>
    </div>
  );
};
