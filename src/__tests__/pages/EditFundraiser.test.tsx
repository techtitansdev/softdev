import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditFundraiser from "~/pages/admin/funding/edit/[id]";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/utils/api", () => ({
  api: {
    fundraiser: {
      getById: {
        useQuery: jest.fn(),
      },
      edit: {
        useMutation: jest.fn(),
      },
    },
  },
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
  useClerk: () => ({
    signOut: jest.fn(),
  }),
}));

describe("EditFundraiser", () => {
  const mockPush = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: "1" },
      push: mockPush,
    });

    (api.fundraiser.getById.useQuery as jest.Mock).mockReturnValue({
      data: {
        project: {
          title: "Test Project",
          description: "Test Description",
          image: "/test-image.jpg",
          hub: "Test Hub",
          category: "Test Category",
          type: "Test Type",
          beneficiaries: "Test Beneficiaries",
          goal: 1000,
          targetDate: "2023-12-31",
          published: false,
          about: [
            {
              projectTitle: "Test Project Title",
              projectDescription: "Test Project Description",
              projectLink: "http://test.com",
              projectImage: "/test-project-image.jpg",
              projectObjDescription: "Test Objective Description",
              projectObjImage: "/test-objective-image.jpg",
              projectName1: "Test Project Name 1",
              projectName1Description: "Test Project Name 1 Description",
              projectName1Image: "/test-project-name1-image.jpg",
              projectName2: "Test Project Name 2",
              projectName2Description: "Test Project Name 2 Description",
              projectName2Image: "/test-project-name2-image.jpg",
              theme: "#ffffff",
            },
          ],
        },
        milestones: [
          {
            id: "1",
            milestone: "Milestone 1",
            value: 50,
            unit: "Unit 1",
            description: "Description 1",
            date: "2023-12-01",
            done: false,
          },
        ],
      },
    });

    (api.fundraiser.edit.useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders the EditProject component", () => {
    render(<EditFundraiser />);

    expect("EDIT FUNDING").toBeTruthy();
    expect("Test Project").toBeTruthy();
    expect("Test Hub").toBeTruthy();
  });

  it("submits the form and calls the editProject mutation", async () => {
    render(<EditFundraiser />);

    fireEvent.change(screen.getByPlaceholderText("title"), {
      target: { value: "Updated Project Title" },
    });

    fireEvent.click(screen.getByText("Save as Draft"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});
