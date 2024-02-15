import { render, fireEvent, waitFor } from "@testing-library/react";
import CreateProjects from "../create";

jest.mock("../../../../server/api/routers/project", () => ({
  __esModule: true,
  default: {
    project: {
      create: {
        useMutation: () => ({
          mutateAsync: jest.fn(),
        }),
      },
    },
  },
}));

describe("Create Projects Component", () => {
  it("should render the create form", () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);

    expect(getByLabelText("Project Title")).toBeInTheDocument();
    expect(getByLabelText("Project Description")).toBeInTheDocument();
    expect(getByText("Save as Draft")).toBeInTheDocument();
    expect(getByText("Publish")).toBeInTheDocument();
  });

  it("should update the input values on change", () => {
    const { getByLabelText } = render(<CreateProjects />);
    const titleInput = getByLabelText("Project Title") as HTMLInputElement;
    const descriptionInput = getByLabelText(
      "Project Description",
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Sample Project" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of Sample Project" },
    });

    expect(titleInput.value).toBe("Sample Project");
    expect(descriptionInput.value).toBe("Description of Sample Project");
  });

  it("should submit the form with valid input", async () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);
    const titleInput = getByLabelText("Project Title");
    const descriptionInput = getByLabelText("Project Description");
    const publishButton = getByText("Publish");
    let modalOpen = false;

    fireEvent.change(titleInput, { target: { value: "Valid Project" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of Valid Project" },
    });

    fireEvent.click(publishButton);

    await waitFor(() => {
      expect(modalOpen).toBeTruthy();
    });
  });

  it("should display an error message with invalid input", async () => {
    const { getByLabelText, getByText } = render(<CreateProjects />);
    const titleInput = getByLabelText("Project Title");
    const descriptionInput = getByLabelText("Project Description");
    const publishButton = getByText("Publish");

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of Invalid Project" },
    });

    fireEvent.click(publishButton);

    await waitFor(() => {
      expect(getByText("Error Message")).toBeInTheDocument();
    });
  });
});
