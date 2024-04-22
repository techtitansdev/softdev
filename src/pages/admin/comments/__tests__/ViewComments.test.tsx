import { render } from "@testing-library/react";
import Comments from "../../index";
import { Sidebar } from "~/components/Sidebar";
import FilterByProjectName from "~/components/FilterByProjectName";
import SearchInput from "~/components/SearchInput";

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
        handleProjectSelect={function (project: string): void {
          throw new Error("Function not implemented.");
        }}
        tableData={[]}
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
        onSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
  });
});
