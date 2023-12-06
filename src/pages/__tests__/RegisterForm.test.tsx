import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { RegisterForm } from "../register/RegisterForm";
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

  const { getByPlaceholderText, getByText } = render(<RegisterForm />);

  fireEvent.change(getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(getByPlaceholderText("Email"), {
    target: { value: "johndoe@gmail.com" },
  });
  fireEvent.change(getByPlaceholderText("Address"), {
    target: { value: "Jaro, Iloilo City" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "JohnDoe@34*" },
  });

  fireEvent.submit(getByText("Sign Up"));

  await waitFor(() => expect(mockCreateUser).toHaveBeenCalled());

  console.log("mockSignUp calls:", mockSignUp.mock.calls);
  console.log("mockCreateUser calls:", mockCreateUser.mock.calls);

  expect(mockSignUp).toHaveBeenCalled();
  expect(mockCreateUser).toHaveBeenCalled();
});