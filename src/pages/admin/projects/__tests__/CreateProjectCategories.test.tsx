import {
  render,
} from "@testing-library/react";
import CreateProjects from "../create";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    categories: {
      getAllCategories: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            { label: "Category 1", value: "category1" },
            { label: "Category 2", value: "category2" },
          ],
        }),
      },
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

describe("CreateProjects", () => {
  it("renders create projects page with create new categories without crashing", () => {
    render(<CreateProjects />);
  });

  it("renders creatable select with existing categories", () => {
    const { getByTestId } = render(<CreateProjects />);
    
    expect(getByTestId("category-select")).toBeTruthy();
  });
});
