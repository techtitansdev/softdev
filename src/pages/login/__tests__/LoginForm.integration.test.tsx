import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "../LoginForm"; 
import { server } from "../../../../msw-setup";

jest.mock("@clerk/nextjs", () => ({
  useSignIn: jest.fn(() => ({
    isLoaded: true,
    signIn: {
      create: jest.fn(),
    },
    setActive: jest.fn(),
  })),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("LoginForm Integration Test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should successfully submit the login form", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

    userEvent.type(screen.getByPlaceholderText(/Email/i), "john.doe@example.com");
    userEvent.type(screen.getByPlaceholderText(/Password/i), "Password123!");

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Log In/i }));
    });

    await waitFor(() =>
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument(),
    );
    
    await waitFor(() =>
      expect(screen.getByTestId("dashboard-page")).toBeInTheDocument(),
    );
  });
});
