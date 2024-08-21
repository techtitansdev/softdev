import React from "react";
import { IoIosClose } from "react-icons/io";
import { AdminModalProps } from "~/types/adminModal";
import { ModalProps } from "~/types/modal";

export const AdminConfirmModal = ({
  isOpen,
  onClose,
  message,
  bgColor,
  onConfirm, // Optional onConfirm prop
}: AdminModalProps) => {
  const modalBackgroundClass = bgColor;

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-start justify-center px-5">
        <div
          className={`mt-8 flex flex-col items-start rounded-lg p-4 shadow-lg ${modalBackgroundClass}`}
        >
          <div className="flex items-center justify-between w-full">
            <p className="mr-2 text-sm text-black">{message}</p>
            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer text-white"
            >
              <IoIosClose size={24} />
            </button>
          </div>

          {/* Render Confirm button if onConfirm is provided */}
          {onConfirm && (
            <div className="mt-4 flex w-full justify-end">
              <button
                onClick={onConfirm}
                className="mr-2 rounded bg-green-500 px-4 py-1 text-white hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="rounded bg-gray-500 px-4 py-1 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};
