import { render, fireEvent, waitFor } from "@testing-library/react";
import CreateProjects from "../create";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
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

describe("CreateProjects integration tets for create new project categories", () => {
  it("submits the form and adds new categories", async () => {
    const { getByTestId, getByText } = render(<CreateProjects />);

    const categoriesInput = getByTestId("category-select");

    fireEvent.change(categoriesInput, { target: { label: "category1" } });
    fireEvent.keyDown(categoriesInput, { target: { label: "category2" } });

    fireEvent.click(getByText(/Publish/i));

    await waitFor(() => {
      expect(api.categories.create.useMutation).toHaveBeenCalled();
    });
  });
});
