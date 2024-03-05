import { render } from "@testing-library/react";
import FundedProjects from "../index";
import FilterByCategory from "~/components/FilterByCategory";
import SearchInput from "~/components/SearchInput";
import { Footer } from "~/components/Footer";

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

describe("FundedProjects component", () => {
  test("renders FundedProjects view correctly", () => {
    render(<FundedProjects />);
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
