import React from "react";
import { render } from "@testing-library/react";
import { Admin } from "../index";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Admin component", () => {
  test("renders admin view", async () => {
    const { findByText } = render(<Admin />);

    await expect(findByText("Loading...")).rejects.toThrow();
    await expect(findByText("UNAUTHORIZED")).rejects.toThrow();
    await expect(findByText("Dashboard")).resolves.toBeInTheDocument();
  });
});
