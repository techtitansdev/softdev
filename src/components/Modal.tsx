import React from "react";
import { IoIosClose } from "react-icons/io";
import { ModalProps } from "~/types/modal";

export const Modal = ({ isOpen, onClose, message, bgColor }: ModalProps) => {
  const modalBackgroundClass = bgColor;

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 flex items-start justify-center">
        <div
          className={`mt-8 flex items-center rounded-lg p-4 shadow-lg ${modalBackgroundClass}`}
        >
          <div className="flex items-center justify-between">
            <p className="mr-2 text-sm text-white">{message}</p>

            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer text-white"
            >
              <IoIosClose size={24} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
