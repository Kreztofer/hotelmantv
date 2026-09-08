"use client";

import { IconType } from "react-icons";

export interface PickerIcon {
  id: string;
  label: string;
  icon: IconType;
}

interface IconPickerProps {
  label: string;
  icons: PickerIcon[];
  value: string;
  onChange: (id: string) => void;
  required?: boolean;
}

const IconPicker = ({
  label,
  icons,
  value,
  onChange,
  required = false,
}: IconPickerProps) => {
  return (
    <div className="mt-1">
      <div className="grid grid-cols-5 gap-5">
        {icons.map(({ id, icon: Icon, label }) => {
          const selected = value === id.toString();

          return (
            <button
              key={id}
              type="button"
              title={label}
              onClick={() => onChange(id.toString())}
              className={`flex w-24 h-24 items-center justify-center rounded-xl border transition-all duration-200
                ${
                  selected
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:bg-blue-50 hover:text-primary"
                }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
