import { render, fireEvent } from "@testing-library/react";
import { Navbar } from "../Navbar";
import { useClerk, useUser } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => ({
  useClerk: jest.fn(),
  useUser: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

test("sign out test", () => {
  const mockSignOut = jest.fn();

  (useClerk as jest.Mock).mockReturnValue({
    signOut: mockSignOut,
  });

  (useUser as jest.Mock).mockReturnValue({
    user: { firstName: "Test", lastName: "User" },
  });

  const { getAllByText } = render(<Navbar />);

  const signOutButtons = getAllByText("Sign out");
  signOutButtons.forEach((button) => {
    fireEvent.click(button);
  });

  expect(mockSignOut).toHaveBeenCalled();
});
