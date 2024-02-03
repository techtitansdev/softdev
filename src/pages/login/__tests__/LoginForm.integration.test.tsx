import { render, fireEvent, act } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { useSignIn } from "@clerk/nextjs";
import router from "next/router";
import { api } from "~/utils/api";

jest.mock("@clerk/nextjs", () => ({
  useSignIn: jest.fn(),
}));

jest.mock("next/router", () => ({
  push: jest.fn(),
}));

jest.mock("~/utils/api", () => ({
  api: {
    user: {
      getRole: {
        useQuery: jest.fn(),
      },
    },
  },
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

    (api.user.getRole.useQuery as jest.Mock).mockReturnValue({
      data: "USER",
    });
  });

  test("login form submission and redirection", async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Password123!" },
    });

    mockSignIn.mockResolvedValueOnce({ status: "complete" });

    router.push = jest.fn().mockResolvedValueOnce(true);
    fireEvent.submit(getByText("Sign In"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    expect(router.push).toHaveBeenCalledWith("/home");
    expect(mockSignIn).toHaveBeenCalledWith({
      identifier: "johndoe@gmail.com",
      password: "Password123!",
    });
    expect(api.user.getRole.useQuery).toHaveBeenCalledWith({
      email: "johndoe@gmail.com",
    });
  });
});
