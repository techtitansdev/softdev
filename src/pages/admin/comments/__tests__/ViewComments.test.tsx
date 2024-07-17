import { render } from "@testing-library/react";
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
  useClerk: () => ({
    signOut: jest.fn(),
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    comment: {
      getAll: {
        useQuery: jest.fn(),
      },
    },
    project: {
      getAll: {
        useQuery: jest.fn(),
      },
    },
    funding: {
      getAll: {
        useQuery: jest.fn(() => ({
          data: [
            {
              id: "1",
              name: "Project 1",
              description: "This is the description for Project 1.",
            },
            {
              id: "2",
              name: "Project 2",
              description: "This is the description for Project 2.",
            },
          ],
        })),
      },
    },
  },
}));

describe("Comments view", () => {
  test("renders Comments view correctly", () => {
    render(<Comments />);

    expect("Comments view").toBeTruthy();
  });
});

describe("Sidebar componnet", () => {
  test("renders Sidebar componnet correctly", () => {
    render(<Sidebar />);

    expect("Sidebar component").toBeTruthy();
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
        handleProjectSelect={function (): void {
          throw new Error("Function not implemented.");
        }}
      />,
    );

    expect("FilterByProjectName component").toBeTruthy();
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
    expect("SearchByName component").toBeTruthy();
  });
});
