import { render } from "@testing-library/react";
import { Navbar } from "~/components/Navbar";

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

  test("user button test", () => {
    render(<Navbar />);

    expect("UserButton").toBeTruthy();
  });

  test("login button test", () => {
    render(<Navbar />);

    expect("LOGIN").toBeTruthy();
  });
});

test("menu open and close", () => {
  render(<Navbar />);

  expect("menu-open").toBeTruthy();
  expect("menu-close").toBeTruthy();
});

test("sign out", () => {
  render(<Navbar />);

  expect("sign-out").toBeTruthy();
});
