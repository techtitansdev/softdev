import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RegisterForm from "../../pages/register/RegisterForm";
import { useSignUp } from "@clerk/nextjs";

jest.mock("~/utils/api", () => ({
  api: {
    user: {
      create: {
        useMutation: jest.fn(),
      },
      verify: {
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
    render(<RegisterForm />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "09123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        emailAddress: "john.doe@gmail.com",
        password: "Password123!",
      });
    });
  });
});
