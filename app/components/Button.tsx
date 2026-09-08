"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "gradient"
    | "blue"
    | "outlineBlue"
    | "outlineRed";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  onClick,
  href,
  ...props
}) => {
  const base =
    "px-6.5 py-2.5 rounded-[10px] text-[14px] transition-all duration-300 ease-in-out transform cursor-pointer hover:scale-104";
  const variants: Record<string, string> = {
    default: "bg-white text-black",
    blue: "bg-[#38adec] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-white",
    outlineBlue: "border border-[#38adec] text-[#38adec] bg-transparent",
    outlineRed: "border border-rose-500 text-rose-500 bg-rose-100",
    outline: "border border-gray-400 bg-transparent cursor-pointer",
    gradient: "bg-gradient-to-r from-[#38adec] to-[#080917] text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className || ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
