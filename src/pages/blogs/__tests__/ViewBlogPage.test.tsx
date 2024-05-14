import { render } from "@testing-library/react";
import Blogs from "../index";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: 1 },
  }),
}));

jest.mock("~/utils/api", () => ({
  __esModule: true,
  api: {
    blog: {
      getAll: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            {
              id: 1,
              title: "First Blog",
              content: "First Blog Content",
            },
            {
              id: 2,
              title: "Second Blog",
              content: "Second Blog Content",
            },
          ],
        }),
      },
    },
  },
}));

describe("Blogs component", () => {
  test("renders Blogs component correctly", async () => {
    const { getByText } = render(<Blogs />);

    expect(getByText("First Blog")).toBeInTheDocument();
    expect(getByText("Second Blog")).toBeInTheDocument();
  });
});

describe("Navbar component", () => {
  test("renders Navbar component correctly", () => {
    render(<Navbar />);
  });
});

describe("Footer component", () => {
  test("renders Footer component correctly", () => {
    render(<Footer />);
  });
});
