import { ButtonHTMLAttributes } from "react";
import Icon from "../Icon";

interface ButtonContentProps {
  title: string;
  onclick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isLoading?: boolean;
  isSmallHeight?: boolean;
  className?: string;
}

export const ButtonContent = ({
  title,
  onclick,
  type,
  isLoading,
  isSmallHeight,
  className,
}: ButtonContentProps) => {
  return (
    <div className="w-full">
      <button
        className={[
          `w-full bg-green-500 rounded-xl flex items-center justify-center font-bold text-lg tracking-wide transition-transform duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-[--highlight] disabled:opacity-60 disabled:cursor-not-allowed ${
            isSmallHeight ? "h-8" : "h-12 max-sm:h-10"
          }`,
          className,
        ].join(" ")}
        onClick={onclick}
        type={type}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon name="LoaderCircle" className="animate-spin" size={20} />
        ) : (
          <span>
            <h1 className="tracking-widest font-extrabold text-xl text-white max-md:text-base">
              {title}
            </h1>
          </span>
        )}
      </button>
    </div>
  );
};
