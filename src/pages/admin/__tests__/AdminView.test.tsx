import React from "react";
import { render } from "@testing-library/react";
import { Admin } from "../index";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Admin component", () => {
  test("renders admin view", () => {
    const { container } = render(<Admin />);

    const adminView = container.querySelector(".admin");
    expect(adminView).toBeDefined();

    const dashboardText = container.querySelector(".dashboard-text");
    expect(dashboardText).toBeDefined();

    const sidebarComponent = container.querySelector(".sidebar");
    expect(sidebarComponent).toBeDefined();
  });
});
