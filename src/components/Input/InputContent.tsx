import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  invert?: boolean;
  onclick?: () => void;
  isSmallHeight?: boolean;
}

export const InputContent = ({
  label,
  type = "text",
  placeholder = "",
  icon,
  error,
  register,
  invert = false,
  onclick,
  isSmallHeight,
}: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label
          className={`text-background text-sm ml-1 tracking-widest font-normal`}
        >
          {label}
        </label>
      )}

      <div
        className={`w-full border rounded-xl p-1 flex items-center ${
          isSmallHeight ? "h-10" : "h-12"
        } ${invert ? "invert" : ""} ${
          error ? "border-red-600" : "border-background"
        }`}
      >
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full 
          h-full bg-transparent px-2 py-3 text-base focus:outline-none text-background font-normal"
        />
        {icon && (
          <span
            className="mr-2 flex items-center cursor-pointer"
            onClick={onclick}
          >
            {icon}
          </span>
        )}
      </div>

      {Boolean(error) && (
        <span className="text-red-600 text-sm ml-2">
          {typeof error === "object" ? error.message : error}
        </span>
      )}
    </div>
  );
};
