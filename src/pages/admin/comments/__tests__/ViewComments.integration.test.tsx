import React from "react";
import { render, screen } from "@testing-library/react";
import Comments from "../index";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ pathname: "/admin" }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    feedback: {
      getAll: {
        useQuery: jest.fn().mockReturnValue({ data: [] }), 
      },
    },
  },
}));

describe("Comments Component Integration Tests", () => {
  test("renders Comments component correctly with loading state", () => {
    render(<Comments />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders Comments component correctly with unauthorized state", () => {
    jest.spyOn(window.console, "error").mockImplementation(() => {}); 
    jest.clearAllMocks(); 
    render(<Comments />);
    expect(screen.getByText("UNAUTHORIZED")).toBeInTheDocument();
  });
});
