import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateProjects from "../create";

jest.mock("~/utils/api", () => ({
  __esModule: true,
  api: {
    project: {
      create: {
        useMutation: jest
          .fn()
          .mockReturnValue([jest.fn().mockResolvedValue({}), {}]),
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

beforeAll(() => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud-name";
});

describe("CreateProjects", () => {
  it("submits the form", async () => {
    const { getByText } = render(<CreateProjects />);

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

    const editorInput = document.querySelector('div[aria-label="Editor"]');
    if (editorInput) {
      fireEvent.change(editorInput, {
        target: { value: "Test Content" },
      });
    }

    fireEvent.click(getByText(/Publish/i));

    await waitFor(() => {
      expect(api.project.create.useMutation).toHaveBeenCalled();
    });
  });
});
