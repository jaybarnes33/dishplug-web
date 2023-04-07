import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "sm" | "lg";
}
const Input = ({ onChange, ...others }: InputProps) => {
  return (
    <input
      className="flex-1 h-full bg-gray-50 p-3  rounded focus-within:outline-none w-full"
      {...others}
      onChange={onChange}
    />
  );
};

export default Input;
