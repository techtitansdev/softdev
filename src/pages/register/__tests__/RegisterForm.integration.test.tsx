import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RegisterForm } from "../RegisterForm";
import { server } from "../../../../msw-setup";

jest.mock("@clerk/nextjs", () => ({
  useSignUp: jest.fn(() => ({
    isLoaded: true,
    signUp: {
      create: jest.fn(),
      prepareEmailAddressVerification: jest.fn(),
      attemptEmailAddressVerification: jest.fn(),
    },
    setActive: jest.fn(),
  })),
}));

jest.mock("react-phone-input-2", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../../utils/api", () => {
  const createUser = jest.fn().mockReturnValue({
    mutate: jest.fn(),
  });
  return {
    api: {
      mutation: {
        user: {
          createUser,
        },
      },
    },
  };
});

describe("RegisterForm Integration Test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should successfully submit the form", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>,
    );

    userEvent.type(screen.getByPlaceholderText(/First Name/i), "John");
    userEvent.type(screen.getByPlaceholderText(/Last Name/i), "Doe");
    userEvent.type(screen.getByPlaceholderText(/Email/i), "john.doe@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/Address/i), "123 Main St");
    userEvent.type(screen.getByPlaceholderText(/Phone Number/i), "09123456789");
    userEvent.type(screen.getByPlaceholderText(/Password/i), "Password123!");
    userEvent.type(
      screen.getByPlaceholderText(/Confirm Password/i),
      "Password123!",
    );

    // Mocking the API call to signUp.create
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    } as unknown as Response);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign Up/i }));
    });

    // Wait for asynchronous operations to complete
    await waitFor(() => {
      expect(screen.getByTestId("loading-indicator")).toHaveBeenCalled();
    });
  });
});
