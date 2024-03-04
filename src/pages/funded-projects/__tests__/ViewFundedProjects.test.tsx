import { render } from "@testing-library/react";
import FilterByCategory from "~/components/FilterByCategory";
import { Footer } from "~/components/Footer";
import SearchInput from "~/components/SearchInput";
import FundedProjects from "../index";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

describe("renders Funding Page view", () => {
  test("renders FundedProjects view correctly", async () => {
    const { findByText } = render(<FundedProjects />);

    const fundraiserPageContents = await findByText("Funded Projects");

    expect(fundraiserPageContents).toBeTruthy();
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
