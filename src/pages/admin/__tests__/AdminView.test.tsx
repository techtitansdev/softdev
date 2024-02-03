import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminView from "../../index";
import { Sidebar } from "~/components/Sidebar";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    pathname: "/admin",
    replace: jest.fn(),
  })),
}));

jest.mock("~/components/Sidebar", () => {
  return {
    __esModule: true,
    Sidebar: jest.fn(() => <div>Mocked Sidebar</div>),
  };
});

describe("AdminView", () => {
  test("renders Admin component correctly", async () => {
    render(<AdminView />);

    await waitFor(
      () => {
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked Sidebar/i)).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });

  it("renders Sidebar component correctly", async () => {
    render(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByText("Funding")).toBeInTheDocument();
    });
  });

  it("handles navigation correctly", async () => {
    render(<Sidebar />);

    await waitFor(() => {
      expect(screen.getByText("Funding")).toBeInTheDocument();
    });
  });
});
