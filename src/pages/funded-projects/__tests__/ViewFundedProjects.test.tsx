import { render } from "@testing-library/react";
import FundedProjects from "../index";
import FilterByCategory from "~/components/filter/FilterByCategory";
import SearchInput from "~/components/search/SearchByProject";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("~/utils/api", () => ({
  __esModule: true,
  api: {
    fundraiser: {
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

describe("FundedProjects view", () => {
  test("renders FundedProjects view correctly", () => {
    render(<FundedProjects />);
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
