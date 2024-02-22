import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateProjects from "~/pages/admin/projects/create";

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      create: {
        useMutation: jest
          .fn()
          .mockReturnValue([jest.fn().mockResolvedValue({}), {}]),
      },
    },
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeAll(() => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud-name";
});

describe("CreateProjects", () => {
  it("renders without crashing", () => {
    render(<CreateProjects />);
  });

  it("submits the form", async () => {
    const { getByText, getByTestId } = render(<CreateProjects />);

    const projectDescriptionInput = document.querySelector(
      'textarea[aria-label="Project Description"]',
    );
    if (projectDescriptionInput) {
      fireEvent.change(projectDescriptionInput, {
        target: { value: "Test Description" },
      });
    }

    const projectHubInput = document.querySelector(
      'input[aria-label="Project Hub"]',
    );
    if (projectHubInput) {
      fireEvent.change(projectHubInput, {
        target: { value: "Test Hub" },
      });
    }

    const projectTypeInput = document.querySelector(
      'input[aria-label="Project Type"]',
    );
    if (projectTypeInput) {
      fireEvent.change(projectTypeInput, {
        target: { value: "Test Type" },
      });
    }

    const projectBeneficiariesInput = document.querySelector(
      'input[aria-label="Project Beneficiaries"]',
    );
    if (projectBeneficiariesInput) {
      fireEvent.change(projectBeneficiariesInput, {
        target: { value: "Test Beneficiaries" },
      });
    }

    fireEvent.click(getByText(/Publish/i));

    await waitFor(() => {
      expect(api.project.create.useMutation).toHaveBeenCalled();
    });
  });
});
