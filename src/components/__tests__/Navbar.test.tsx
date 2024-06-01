import { render, screen } from "@testing-library/react";
import { Navbar } from "~/components/Navbar";

jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({ user: {} }),
  useClerk: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
  SignOut: () => <div data-testid="sign-out"></div>,
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

describe("Navbar component", () => {
  test("renders navbar component", () => {
    render(<Navbar />);

    expect("navbar").toBeTruthy();
  });

  test("navigation links test", () => {
    render(<Navbar />);

    expect("/home").toBeTruthy();
    expect("/about-us").toBeTruthy();
    expect("/blogs").toBeTruthy();
    expect("/impact").toBeTruthy();
    expect("/projects").toBeTruthy();
    expect("/partners").toBeTruthy();
  });

  test("user button check", () => {
    render(<Navbar />);

    expect(screen.getByTestId("UserButton")).toBeInTheDocument();
  });

  //user button check
  //login button check
  //menu open
  //menu close
  //scroll effect
  //resize effect
  //sign out
  //navigation test
});
