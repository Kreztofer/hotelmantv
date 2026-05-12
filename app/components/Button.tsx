"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className,
  onClick,
  ...props
}) => {
  const base =
    "px-7 py-2.5 cursor-pointer hover:scale-105 rounded-[10px] text-[14px] transition-all duration-300 ease-in-out transform";

  const variants: Record<string, string> = {
    default: "bg-white text-black",
    outline: "border border-gray-400 bg-transparent cursor-pointer",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (variant === "default") {
      const link = document.createElement("a");
      link.href = "/hotelmantv.apk";
      link.download = "hotelmantv.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className || ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
