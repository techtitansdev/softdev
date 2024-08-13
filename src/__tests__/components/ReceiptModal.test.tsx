// __tests__/ReceiptModal.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReceiptModal from "../../components/ReceiptModal";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ReceiptModal", () => {
  const mockPush = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  const paymentDetails = {
    paymentID: "123456",
    amount: 5000,
    currency: "USD",
    paymentMethod: "Credit Card",
    fullName: "John Doe",
    email: "john.doe@example.com",
  };

  it("renders correctly when isOpen is true", () => {
    render(
      <ReceiptModal
        isOpen={true}
        onClose={mockOnClose}
        paymentDetails={paymentDetails}
        id="modal1"
      />,
    );

    expect("Payment Success!").toBeTruthy();
    expect("50 USD").toBeTruthy();
    expect("123456").toBeTruthy();
    expect("Credit Card").toBeTruthy();
    expect("John Doe").toBeTruthy();
    expect("john.doe@example.com").toBeTruthy();
  });

  it("calls onClose and navigates to /funded-projects on close button click", () => {
    render(
      <ReceiptModal
        isOpen={true}
        onClose={mockOnClose}
        paymentDetails={paymentDetails}
        id="modal1"
      />,
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/funded-projects");
  });
});
