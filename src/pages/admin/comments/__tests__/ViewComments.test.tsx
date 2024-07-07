import { render, screen } from "@testing-library/react";
import Comments from "../../index";
import { Sidebar } from "~/components/Sidebar";
import FilterByProjectName from "~/components/filter/FilterByProjectName";
import SearchByName from "~/components/search/SearchByName";

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

    expect(screen.getByText("Comments view")).toBeInTheDocument();
  });
});

describe("Sidebar componnet", () => {
  test("renders Sidebar componnet correctly", () => {
    render(<Sidebar />);

    expect(screen.getByText("Sidebar component")).toBeInTheDocument();
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
        handleProjectSelect={() => {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    expect(
      screen.getByText("FilterByProjectName component"),
    ).toBeInTheDocument();
  });
});

describe("SearchByName component", () => {
  test("renders SearchByName component correctly", () => {
    render(
      <SearchByName
        value={""}
        onChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        onEnter={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );
    expect(screen.getByText("SearchByName component")).toBeInTheDocument();
  });
});
