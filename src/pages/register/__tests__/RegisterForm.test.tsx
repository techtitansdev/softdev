import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { RegisterForm } from "../RegisterForm";
import { useSignUp } from "@clerk/nextjs";
import { api } from "~/utils/api";

jest.mock("@clerk/nextjs", () => ({
  useSignUp: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
    push: jest.fn(),
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    user: {
      create: {
        useMutation: jest.fn(),
      },
    },
  },
}));

jest.mock("libphonenumber-js", () => ({
  parsePhoneNumber: jest.fn(),
}));

test("register form submission", async () => {
  const mockSignUp = jest.fn();
  const mockCreateUser = jest.fn();

  (useSignUp as jest.Mock).mockReturnValue({
    isLoaded: true,
    signUp: {
      create: mockSignUp,
      prepareEmailAddressVerification: jest.fn(),
    },
    setActive: jest.fn(),
  });

  (api.user.create.useMutation as jest.Mock).mockReturnValue({
    mutate: mockCreateUser,
  });

  render(<RegisterForm />);

  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "johndoe@gmail.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Address"), {
    target: { value: "Jaro, Iloilo City" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "JohnDoe@34*" },
  });

  fireEvent.submit(screen.getByText("Sign Up"));

  await waitFor(() => {
    expect(mockSignUp).toHaveBeenCalled();
  });
});
