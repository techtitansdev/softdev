import { render } from "@testing-library/react";
import Comments from "../../index";
import { Sidebar } from "~/components/Sidebar";
import FilterByProjectName from "~/components/filter/FilterByProjectName";
import SearchInput from "~/components/search/SearchByProject";

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

describe("Comments view", () => {
  test("renders Comments view correctly", () => {
    render(<Comments />);
  });
});

describe("Sidebar componnet", () => {
  test("renders Sidebar componnet correctly", () => {
    render(<Sidebar />);
  });
});

describe("FilterByProjectName component", () => {
  test("renders FilterByProjectName component correctly", () => {
    render(
      <FilterByProjectName
        selectedProject={""}
        isProjectListOpen={false}
        toggleProjectList={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleProjectSelect={function (status: string): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
  });
});

describe("SearchInput component", () => {
  test("renders SearchInput component correctly", () => {
    render(
      <SearchInput
        value={""}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        onEnter={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
  });
});
