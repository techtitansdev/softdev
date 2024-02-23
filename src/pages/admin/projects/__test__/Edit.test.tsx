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
        useQuery: jest.fn().mockReturnValue({
          data: {
            id: "test-project-id",
            title: "Test Project Title",
            description: "Test Project Description",
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

    await waitFor(() => {});
  });

  it("does not edit project if some fields are empty", async () => {
    const { getByLabelText, getByText } = render(<EditProject />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Image"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Category"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Hub"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Beneficiaries"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Type"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project About"), {
      target: { value: "" },
    });

    fireEvent.click(getByText("Publish"));
  });
});
