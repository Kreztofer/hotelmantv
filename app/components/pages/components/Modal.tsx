import React from "react";
import { MdCancel } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-[50%] bg-white shadow-2xl flex flex-col">
        <div className="border-b border-gray-300 px-8 py-6 flex justify-between">
          <div>
            <h2 className="text-[18px] font-bold">{title}</h2>

            {subtitle && (
              <p className="text-gray-500 text-[14px]  mt-1">{subtitle}</p>
            )}
          </div>

          <button className="cursor-pointer" onClick={onClose}>
            <MdCancel className="text-[#38adec]" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </>
  );
}
