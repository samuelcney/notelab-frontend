import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";

interface ButtonContentProps {
  title: string;
  onclick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isLoading?: boolean;
}

export const ButtonContent = ({
  title,
  onclick,
  type,
  isLoading,
}: ButtonContentProps) => {
  return (
    <div className="w-full">
      <button
        className="w-full h-12 bg-foreground text-background rounded-xl flex items-center justify-center font-bold text-lg tracking-wide transition-transform duration-300 hover:scale-[1.03] focus:ring-2 focus:ring-[--highlight] disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={onclick}
        type={type}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon name="LoaderCircle" className="animate-spin" size={20} />
        ) : (
          <span>
            <h1 className="tracking-wider font-bold text-lg">
              {title.toUpperCase()}
            </h1>
          </span>
        )}
      </button>
    </div>
  );
};
