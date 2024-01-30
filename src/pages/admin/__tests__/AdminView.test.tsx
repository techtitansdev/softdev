import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Admin } from "../index";
const mockedRouter = { pathname: "/admin" };

jest.mock("next/head", () => {
  return {
    __esModule: true,
    Head: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue(mockedRouter),
}));

describe("Admin Component", () => {
  it("renders admin dashboard correctly", () => {
    render(<Admin />);

    // Assertions
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toHaveClass("bg-blue-800 text-white");
    expect(screen.getByText("Funding")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Blogs")).toBeInTheDocument();
    expect(screen.getByText("Donors")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });
});
