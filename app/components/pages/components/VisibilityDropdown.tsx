"use client";

import { useState } from "react";
import { FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa6";

interface VisibilityDropdownProps {
  value: "Visible" | "Hidden";
  label?: string;
  onChange: (value: "Visible" | "Hidden") => void;
}

export default function VisibilityDropdown({
  value,
  onChange,
  label,
}: VisibilityDropdownProps) {
  const [open, setOpen] = useState(false);

  const options: ("Visible" | "Hidden")[] = ["Visible", "Hidden"];

  return (
    <div className="relative space-y-2 w-full">
      <label className="flex items-center gap-1 text-xs font-semibold  text-gray-500">
        <span>{label}</span>
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 px-4 hover:border-primary"
      >
        <div className="flex text-[14px] items-center gap-2">
          {value === "Visible" ? (
            <FaEye className="text-primary" />
          ) : (
            <FaEyeSlash className="text-gray-500" />
          )}

          <span
            className={value === "Visible" ? "text-primary" : "text-gray-500"}
          >
            {value}
          </span>
        </div>

        <FaChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex w-full text-[14px] items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 ${
                value === option ? "bg-gray-50" : ""
              }`}
            >
              {option === "Visible" ? (
                <FaEye className="text-primary" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}

              <span
                className={
                  option === "Visible" ? "text-primary" : "text-gray-500"
                }
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
