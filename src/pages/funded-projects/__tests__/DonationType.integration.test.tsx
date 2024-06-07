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
      updateFunds: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    payment: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    paymentRouter: {
      createPaymentIntent: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
      createPaymentMethod: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
      createGCashPaymentMethod: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
      attachPaymentIntent: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    donors: {
      createDonor: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
      createFunding: {
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
  test("allows user to choose to donate as individual", () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Individual"));
    expect(screen.getByTestId("Individual")).toBeInTheDocument();
  });

  test("allows user to choose to donate as company", () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Company"));
    expect(screen.getByTestId("Company")).toBeInTheDocument();
  });

  test("allows user to choose to donate as anonymous", () => {
    render(<Payment />);

    fireEvent.click(screen.getByTestId("Anonymous"));
    expect(screen.getByTestId("Anonymous")).toBeInTheDocument();
  });
});
