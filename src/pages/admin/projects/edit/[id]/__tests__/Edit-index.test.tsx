import { render, fireEvent, waitFor } from "@testing-library/react";
import EditProject from "../index";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      edit: {
        useMutation: jest.fn(),
      },
    },
  },
}));

describe("EditProject", () => {
  it("renders correctly", () => {
    const { getByLabelText, getByText } = render(<EditProject />);

    expect(getByLabelText("Project Title")).toBeInTheDocument();
    expect(getByLabelText("Project Description")).toBeInTheDocument();
    expect(getByLabelText("Featured Image")).toBeInTheDocument();
    expect(getByLabelText("Hub")).toBeInTheDocument();
    expect(getByLabelText("Categories")).toBeInTheDocument();
    expect(getByLabelText("Type")).toBeInTheDocument();
    expect(getByLabelText("Beneficiaries")).toBeInTheDocument();
    expect(getByLabelText("About")).toBeInTheDocument();
    expect(getByText("Save as Draft")).toBeInTheDocument();
    expect(getByText("Publish")).toBeInTheDocument();
  });

  it("updates project data when inputs change", async () => {
    const { getByLabelText } = render(<EditProject />);
    const titleInput = getByLabelText("Project Title") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(titleInput.value).toBe("New Title");
  });

  it("submits form with correct data", async () => {
    const { getByText } = render(<EditProject />);
    const publishButton = getByText("Publish");
    fireEvent.click(publishButton);

    await waitFor(() => {
      expect(api.project.edit.useMutation).toHaveBeenCalledWith({
        id: "mocked_id",
        published: false,
        image: "",
        about: "",
        title: "",
        description: "",
        hub: "",
        categories: [],
        type: "",
        beneficiaries: [],
      });
    });
  });
});
