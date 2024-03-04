import { render } from "@testing-library/react";
import FilterByCategory from "~/components/FilterByCategory";
import { Footer } from "~/components/Footer";
import SearchInput from "~/components/SearchInput";
import FundedProjects from "../index";
import { Navbar } from "~/components/Navbar";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn().mockReturnValue({
    user: {
      publicMetadata: {
        user: "user",
      },
    },
    isLoaded: true,
  }),
  useClerk: jest.fn().mockReturnValue({
    signOut: jest.fn(),
  }),
}));

jest.mock("~/utils/api", () => ({
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

describe("renders Funding Page view", () => {
  test("renders FundedProjects view correctly", () => {
    render(<FundedProjects />);
  });

  test("renders Navbar components correctly", () => {
    render(<Navbar />);
  });

  test("renders FilterByCategory component correctly", () => {
    render(
      <FilterByCategory
        selectedCategory={""}
        isCategoryListOpen={false}
        toggleCategoryList={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleCategorySelect={function (status: string): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
  });

  test("renders SearchInput component correctly", () => {
    render(
      <SearchInput
        value={""}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        onSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
  });

  test("renders Footer component correctly", () => {
    render(<Footer />);
  });
});
