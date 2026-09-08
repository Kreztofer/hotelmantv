"use client";

import { FaTrashAlt, FaInfoCircle } from "react-icons/fa";

import Button from "../../Button";

interface ConfirmationModalProps {
  variant?: "danger" | "info";
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        >
          {/* Content */}
          <div className="flex flex-col items-center px-8 py-8 text-center">
            {/* Icon */}
            <div
              className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
                variant === "danger" ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              {variant === "danger" ? (
                <FaTrashAlt className="text-2xl text-red-600" />
              ) : (
                <FaInfoCircle className="text-2xl text-primary" />
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

            {/* Message */}
            <p className="mt-3 text-sm leading-6 text-gray-500">{message}</p>

            {/* Buttons */}
            <div className="mt-8 flex w-full gap-3">
              <Button
                className="flex-1"
                variant="outlineBlue"
                onClick={onCancel}
              >
                {cancelText}
              </Button>

              <Button
                className="flex-1"
                variant="outlineRed"
                disabled={loading}
                onClick={onConfirm}
              >
                {loading ? "Deleting..." : confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
