import { render } from "@testing-library/react";
import Projects from "../../pages/projects/index";
import { Navbar } from "~/components/Navbar";
import FilterByCategory from "~/components/filter/FilterByCategory";
import { Footer } from "~/components/Footer";
import SearchInput from "~/components/search/SearchByProject";

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
    categories: {
      getAllCategories: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            {
              id: 1,
              label: "Category A",
            },
            {
              id: 2,
              label: "Category B",
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

    expect(Projects).toBeTruthy();
  });
});

describe("Navbar component", () => {
  test("renders Navbar component correctly", () => {
    render(<Navbar />);

    expect("navbar").toBeTruthy();
  });
});

describe("FilterByCategory component", () => {
  test("renders FilterByCategory component correctly", () => {
    render(
      <FilterByCategory
        selectedCategory={""}
        isCategoryListOpen={false}
        toggleCategoryList={() => {
          console.log("Toggle category list");
          return null;
        }}
        handleCategorySelect={() => {
          console.log("Handle category select");
        }}
      />,
    );

    expect("filter-by-category").toBeTruthy();
  });
});

describe("SearchInput component", () => {
  test("renders SearchInput component correctly", () => {
    render(
      <SearchInput
        value={""}
        onChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        onEnter={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );

    expect("search-input").toBeTruthy();
  });
});

describe("Footer component", () => {
  test("renders Footer component correctly", () => {
    render(<Footer />);

    expect("footer").toBeTruthy();
  });
});
