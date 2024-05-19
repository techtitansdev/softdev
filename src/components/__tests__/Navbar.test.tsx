import { render, fireEvent } from "@testing-library/react";
import { Navbar } from "~/components/Navbar";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { user_id: "1" } },
    isLoaded: true,
  })),
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
  test("sign out test", () => {
    const { getByTestId, container } = render(<Navbar />);

    console.log(container.innerHTML);

    const signOutButton = getByTestId("sign-out");
    fireEvent.click(signOutButton);

    expect(getByTestId("sign-out")).toBeTruthy();
    expect(signOutButton).toHaveBeenCalled();
  });
});
