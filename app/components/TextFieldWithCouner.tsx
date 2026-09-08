"use client";

import { ChangeEvent } from "react";

interface TextFieldWithCounterProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxLength: number;
  multiline?: boolean;
  placeholder?: string;
}

export default function TextFieldWithCounter({
  label,
  value,
  onChange,
  maxLength,
  required = false,
  multiline = false,
  placeholder,
}: TextFieldWithCounterProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-xs font-semibold  text-gray-500">
          <span>{label}</span>

          {required && <span className="text-rose-500">*</span>}
        </label>

        <span className="text-xs text-gray-400">
          {value.length} / {maxLength}
        </span>
      </div>

      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={3}
          placeholder={placeholder}
          className="w-full rounded-lg text-[14px] border border-gray-200 p-3 outline-none focus:border-[#38adec]"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className="h-12 w-full rounded-lg text-[14px] border border-gray-200 px-3 outline-none focus:border-[#38adec]"
        />
      )}
    </div>
  );
}
