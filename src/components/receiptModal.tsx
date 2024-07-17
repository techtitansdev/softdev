// components/ReceiptModal.tsx
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDetails: {
    paymentID: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    fullName: string;
    email: string;
  };
  id: string;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  paymentDetails,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    router.push(`/funded-projects`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-2 rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-3 mt-4 flex justify-center">
          <Image src="/check.png" width={32} height={32} alt="check-icon" />
        </div>

        <div className="mb-2 text-center text-base font-medium">
          Payment Success!
        </div>
        <div className="my-4 mb-6 text-center text-2xl font-bold">
          {paymentDetails.amount / 100} {paymentDetails.currency}
        </div>

        <hr className="border-t-1 my-2 border border-gray-200" />

        <div className="my-4 mt-6 flex justify-between">
          <span className="mr-6 text-sm">Ref Number</span>
          <span className="text-sm font-semibold">
            {paymentDetails.paymentID}
          </span>
        </div>

        <div className="my-4 flex justify-between">
          <span className="text-sm">Payment Method</span>
          <span className="text-sm font-semibold">
            {paymentDetails.paymentMethod}
          </span>
        </div>

        <div className="my-4 flex justify-between">
          <span className="text-sm">Sender Name</span>
          <span className="text-sm font-semibold">
            {paymentDetails.fullName}
          </span>
        </div>

        <div className="my-4 flex justify-between">
          <span className="mr-20 text-sm">Sender Email</span>
          <span className="text-sm font-semibold">{paymentDetails.email}</span>
        </div>

        <hr className="border-t-1 my-2 border-dashed border-gray-400" />

        <div className="my-4 mt-4 flex justify-between">
          <span className="text-sm">Amount</span>
          <span className="text-sm font-semibold">
            {paymentDetails.amount / 100} {paymentDetails.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
