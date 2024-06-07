import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Admin } from "../../pages/admin/index";

jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: { publicMetadata: { admin: "user" } },
    isLoaded: true,
  }),
}));

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    push: jest.fn(),
  },
}));

describe("Admin component", () => {
  test("redirects to /admin when the user is admin", async () => {
    render(<Admin />);

    await waitFor(() => {
      expect("/admin").toBeTruthy();
    });
  });

  test("redirects to /home when user is not an admin", async () => {
    render(<Admin />);

    await waitFor(() => {
      expect("/home").toBeTruthy();
    });
  });
});
