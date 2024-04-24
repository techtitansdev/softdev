import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Payment from "../[id]/payment";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("~/utils/api", () => ({
  api: {
    fundraiser: {
      getById: {
        useQuery: jest.fn().mockReturnValue({ data: {} }),
      },
    },
    payment: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
  }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { user_id: "1" } },
    isLoaded: true,
  })),
  useClerk: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

describe("Payment component", () => {
  test("allows user to choose to donate as individual", async () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Individual"));
    expect(screen.getByTestId("Individual")).toBeTruthy();
  });

  test("allows user to choose to donate as company", async () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Company"));
    expect(screen.getByTestId("Company")).toBeTruthy();
  });

  test("allows user to choose to donate as anonymous", async () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Anonymous"));
    expect(screen.getByTestId("Anonymous")).toBeTruthy();
  });
});
