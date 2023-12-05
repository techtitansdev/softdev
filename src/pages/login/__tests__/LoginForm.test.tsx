import { render, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { useSignIn } from "@clerk/nextjs";
import router from "next/router";

jest.mock("@clerk/nextjs", () => ({
  useSignIn: jest.fn(),
}));

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

const mockSignIn = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSignIn as jest.Mock).mockReturnValue({
      isLoaded: true,
      signIn: { create: mockSignIn },
      setActive: jest.fn(),
    });
  });

  test("login form submission", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "JohnDoe@34*" },
    });

    mockSignIn.mockResolvedValueOnce({ status: "complete" });

    fireEvent.submit(getByText("Sign In"));

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/home"));

    expect(mockSignIn).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/home");
  });
});
