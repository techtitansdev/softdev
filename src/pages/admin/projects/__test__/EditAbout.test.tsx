import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProject from "../edit/[id]";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

// Mock API module
jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            title: "Mocked Title",
            description: "Mocked Description",
            image: "/mocked_image_url",
            hub: "Mocked Hub",
            category: "Mocked Category",
            type: "Mocked Type",
            beneficiaries: "Mocked Beneficiaries",
            about: "Mocked About",
          },
          isLoading: false,
          isError: false,
        })),
      },
      removeImage: {
        useMutation: jest.fn(),
      },
      edit: {
        useMutation: jest.fn(),
      },
    },
    categories: {
      getAllCategories: {
        useQuery: jest.fn(() => ({
          data: [{ label: "Category 1", value: "category1" }],
          isLoading: false,
          isError: false,
        })),
      },
    },
  },
}));

describe("EditProject component", () => {
  it("renders edit project form", async () => {
    render(<EditProject />);

    // Assert that project data is loaded
    expect(screen.getByLabelText(/Project Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hub/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Beneficiaries/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Save as Draft/i)).toBeInTheDocument();
    expect(screen.getByText(/Publish/i)).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    render(<EditProject />);

    // Fill form inputs
    userEvent.type(screen.getByLabelText(/Project Title/i), "New Title");
    userEvent.type(
      screen.getByLabelText(/Project Description/i),
      "New Description",
    );
    userEvent.type(screen.getByLabelText(/Hub/i), "New Hub");
    userEvent.type(
      screen.getByLabelText(/Beneficiaries/i),
      "New Beneficiaries",
    );

    // Submit form
    fireEvent.click(screen.getByText(/Save as Draft/i));

    // Wait for the form submission
    await waitFor(() => {
      // Assert that the edit mutation is called with the correct data
      expect(api.project.edit.useMutation).toHaveBeenCalledWith({
        title: "New Title",
        description: "New Description",
        image: "/mocked_image_url", // This value is obtained from the mock data
        hub: "New Hub",
        category: "Mocked Category", // This value is obtained from the mock data
        type: "Mocked Type", // This value is obtained from the mock data
        beneficiaries: "New Beneficiaries",
        about: "Mocked About", // This value is obtained from the mock data
        id: "mocked_id",
        published: false,
        featured: false,
      });
    });
  });
});
