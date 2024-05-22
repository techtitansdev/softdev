// components/ReceiptModal.tsx
import React from "react";
import { useRouter } from "next/router";

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
  id: string; // Assuming id is needed for router.push
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, paymentDetails, id }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    router.push(`http://localhost:3000/funded-projects/${id}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Payment Receipt</h2>
        <p><strong>Ref No.:</strong> {paymentDetails.paymentID}</p>
        <p><strong>Amount:</strong> {paymentDetails.amount / 100} {paymentDetails.currency}</p>
        <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
        <p><strong>Full Name:</strong> {paymentDetails.fullName}</p>
        <p><strong>Email:</strong> {paymentDetails.email}</p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
