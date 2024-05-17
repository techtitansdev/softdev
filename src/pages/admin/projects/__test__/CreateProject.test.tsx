import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateProjects from "../create";

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    categories: {
      create: {
        useMutation: jest.fn(),
      },
      getAllCategories: {
        useQuery: jest.fn().mockReturnValue({ data: [] }),
      },
    },
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("CreateProjects component", () => {
  it("Creates a project successfully when all data is provided", async () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "Test Project Title" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "Test Project Description" },
    });
    fireEvent.change(getByLabelText("Project Image"), {
      target: { value: "Test Project Image" },
    });
    fireEvent.change(getByLabelText("Project Hub"), {
      target: { value: "Test Project Hub" },
    });
    fireEvent.change(getByLabelText("Project Category"), {
      target: { value: "Test Project Category" },
    });
    fireEvent.change(getByLabelText("Project Type"), {
      target: { value: "Test Project Type" },
    });
    fireEvent.change(getByLabelText("Project Beneficiaries"), {
      target: { value: "Test Project Beneficiaries" },
    });
    fireEvent.change(getByLabelText("Project About"), {
      target: { value: "Test Project About" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.project.create.useMutation).toHaveBeenCalled();
    });
  });

  it("Will not create project if value is wrong or empty", async () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "" },
    });

    fireEvent.click(getByText("Publish"));
  });
});
