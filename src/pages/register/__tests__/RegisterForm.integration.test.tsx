import { render, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "../RegisterForm";
import { api } from "~/utils/api";
import { useSignUp } from "@clerk/nextjs";

jest.mock("~/utils/api", () => ({
  api: {
    user: {
      create: {
        useMutation: jest.fn(),
      },
    },
  },
}));

jest.mock("@clerk/nextjs", () => ({
  useSignUp: jest.fn(),
}));

describe("RegisterForm", () => {
  it("submits the form with valid data", async () => {
    const mockSignUp = jest.fn();
    (useSignUp as jest.Mock).mockReturnValue({
      signUp: {
        create: mockSignUp,
      },
    });

    const { getByPlaceholderText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "john.doe@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(getByPlaceholderText("Phone Number"), {
      target: { value: "09123456789" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(getByText("Sign Up"));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        emailAddress: "john.doe@gmail.com",
        password: "Password123!",
      });
    });
  });
});
