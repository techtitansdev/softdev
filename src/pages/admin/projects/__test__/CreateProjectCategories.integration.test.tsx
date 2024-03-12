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

describe("CreateProjects integration test for creating new categories", () => {
  it("submits the form and creates new categories", async () => {
    const { getByText, getByLabelText } = render(<CreateProjects />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "Test Project" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(getByLabelText("Hub"), { target: { value: "Test Hub" } });
    fireEvent.change(getByLabelText("Beneficiaries"), {
      target: { value: "Test Beneficiaries" },
    });

    fireEvent.change(getByLabelText("Categories"), {
      target: { value: "New Category 1, New Category 2" },
    });

    fireEvent.click(getByText("Activity"));

    fireEvent.change(getByLabelText("About"), {
      target: { value: "Test About" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.categories.create.useMutation).toHaveBeenCalledTimes(1);
    });
  });
});
