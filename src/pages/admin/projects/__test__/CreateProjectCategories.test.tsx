import { render, fireEvent, waitFor } from "@testing-library/react";
import CreateProjects from "../create";
import { api } from "~/utils/api";

jest.mock("~/utils/api", () => ({
  ...jest.requireActual("~/utils/api"),
  categories: {
    getAllCategories: {
      useQuery: jest.fn().mockReturnValue({ data: [] }),
    },
    create: {
      useMutation: jest.fn().mockResolvedValue({}),
    },
  },
}));

describe("CreateProjects component", () => {
  it("renders funding page with create new categories without crashing", () => {
    render(<CreateProjects />);
  });

  it("creates a new category successfully", async () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);
    fireEvent.click(getByText("Create New Category"));
    fireEvent.change(getByLabelText("Category Name"), {
      target: { value: "Test Category" },
    });
    fireEvent.click(getByText("Create"));
    await waitFor(() => {
      expect(api.categories.create.useMutation).toHaveBeenCalled();
    });
  });
});
