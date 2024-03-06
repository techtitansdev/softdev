import { render, fireEvent, waitFor } from "@testing-library/react";
import Projects from "../index";
import { Navbar } from "~/components/Navbar";
import FilterByCategory from "~/components/FilterByCategory";
import { Footer } from "~/components/Footer";
import SearchInput from "~/components/SearchInput";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("~/utils/api", () => ({
  __esModule: true,
  api: {
    project: {
      getAll: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            {
              id: 1,
              project: {
                title: "Project Title",
                category: "Category A",
                published: true,
              },
            },
          ],
        }),
      },
    },
  },
}));

describe("Projects view", () => {
  test("renders Projects view correctly", () => {
    render(<Projects />);
  });
});

describe("Navbar component", () => {
  test("renders Navbar component correctly", () => {
    render(<Navbar />);
  });
});

describe("FilterByCategory component", () => {
  test("renders FilterByCategory component correctly", () => {
    render(
      <FilterByCategory
        selectedCategory={""}
        isCategoryListOpen={false}
        toggleCategoryList={() => {}}
        handleCategorySelect={() => {}}
      />,
    );
  });
});

describe("SearchInput component", () => {
  test("renders SearchInput component correctly", () => {
    render(<SearchInput value={""} onChange={() => {}} onSearch={() => {}} />);
  });
});

describe("Footer component", () => {
  test("renders Footer component correctly", () => {
    render(<Footer />);
  });
});
