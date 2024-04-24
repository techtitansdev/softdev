import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Payment from "../[id]/payment";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        id: "1",
      },
    };
  },
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
  test("submits form with correct data", async () => {
    render(<Payment />);
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "09123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Payment Method"), {
      target: { value: "Credit Card" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /pay now/i }));
  });
});
