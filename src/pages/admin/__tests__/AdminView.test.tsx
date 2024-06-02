import React from "react";
import { render } from "@testing-library/react";
import { Admin } from "../index";
import { Sidebar } from "~/components/Sidebar";
import Loading from "~/components/Loading";
import Unauthorized from "~/components/Unauthorized";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/admin",
  }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
}));

describe("Admin component", () => {
  test("renders admin view", () => {
    render(<Admin />);

    expect("Admin view").toBeTruthy();
  });

  test("renders loading component", () => {
    render(<Loading />);

    expect("Loading...").toBeTruthy();
  });

  test("renders unauthorized component", () => {
    render(<Unauthorized />);

    expect("Unauthorized").toBeTruthy();
  });

  test("renders sidebar component", () => {
    render(<Sidebar />);

    expect("Sidebar").toBeTruthy();
  });
});
