import { render, fireEvent, waitFor } from "@testing-library/react";
import EditProject from "../edit/[id]";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { id: "test-project-id" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getById: {
        useQuery: jest.fn().mockResolvedValue({
          data: {
            id: "test-project-id",
            title: "Test Project Title",
            description: "Test Project Description",
            image: "Test Project Image",
            category: "Test Project Category",
            hub: "Test Project Hub",
            beneficiaries: "Test Project Beneficiaries",
            type: "Test Project Type",
            about: "Test Project About",
          },
        }),
      },
      edit: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

describe("EditProject component", () => {
  it("successfully edits a project when all data is provided", async () => {
    const { getByLabelText, getByText } = render(<EditProject />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "Updated Test Project Title" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "Updated Test Project Description" },
    });
    fireEvent.change(getByLabelText("Project Image"), {
      target: { value: "Updated Test Project Image" },
    });
    fireEvent.change(getByLabelText("Project Category"), {
      target: { value: "Updated Test Project Category" },
    });
    fireEvent.change(getByLabelText("Project Hub"), {
      target: { value: "Updated Test Project Hub" },
    });
    fireEvent.change(getByLabelText("Project Beneficiaries"), {
      target: { value: "Updated Test Project Beneficiaries" },
    });
    fireEvent.change(getByLabelText("Project Type"), {
      target: { value: "Updated Test Project Type" },
    });
    fireEvent.change(getByLabelText("Project About"), {
      target: { value: "Updated Test Project About" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.project.edit.useMutation).toHaveBeenCalledWith({
        id: "test-project-id",
        title: "Updated Test Project Title",
        description: "Updated Test Project Description",
        image: "Updated Test Project Image",
        category: "Updated Test Project Category",
        hub: "Updated Test Project Hub",
        beneficiaries: "Updated Test Project Beneficiaries",
        type: "Updated Test Project Type",
        about: "Updated Test Project About",
      });
    });
  });

  it("does not edit project if some fields are empty", async () => {
    const { getByLabelText, getByText } = render(<EditProject />);

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.project.edit.useMutation).not.toHaveBeenCalled();
    });
  });
});
