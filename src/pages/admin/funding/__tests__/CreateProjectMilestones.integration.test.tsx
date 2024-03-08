import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateFunding from "../create";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return <img />;
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { projectId: "test-project-id" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    milestone: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    project: {
      getAllProjectTitles: {
        useQuery: jest.fn().mockReturnValue({
          data: [{ title: "Test Project" }],
        }),
      },
      getByTitle: {
        useQuery: jest.fn().mockReturnValue({
          data: {
            id: "test-project-id",
            title: "Test Project",
            hub: "Test Hub",
            category: "Test Category",
            beneficiaries: "Test Beneficiaries",
            type: "Test Type",
            image: "Test Image",
            description: "Test Description",
            about: "Test About",
          },
        }),
      },
    },
    fundraiser: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

describe("CreateFunding integration test for creating milestones", () => {
  it("submits the form and creates milestones", async () => {
    const { getByText, getByTestId } = render(<CreateFunding />);

    const milestoneTitleInput = getByTestId("milestone-title-input");
    fireEvent.change(milestoneTitleInput, {
      target: { value: "Test Milestone Title" },
    });

    fireEvent.change(getByTestId("funding-goal-input"), {
      target: { value: "100" },
    });
    fireEvent.change(getByTestId("milestone-unit-input"), {
      target: { value: "USD" },
    });
    fireEvent.change(getByTestId("milestone-description-input"), {
      target: { value: "Test Milestone Description" },
    });

    fireEvent.click(getByText(/Publish/i));

    await waitFor(() => {
      expect(api.milestone.create.useMutation).toHaveBeenCalled();
    });
  });
});
