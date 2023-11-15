import React from "react";
import { IoIosClose } from "react-icons/io";
import { ModalProps } from "~/types/modal";

export const Modal = ({ isOpen, onClose, message }: ModalProps) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-10 flex items-start justify-center">
        <div className="mt-8 flex items-center rounded-lg bg-gray-800 p-4 shadow-lg">
          <div className="flex w-28 items-center justify-between">
            <p className="text-sm text-white">{message}</p>

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
