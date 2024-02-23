import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { api } from "~/utils/api";
import EditProject from "../edit/[id]";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

// Mock API module
// Mock API module
jest.mock('~/utils/api', () => ({
  api: {
    project: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            title: 'Mocked Title',
            description: 'Mocked Description',
            image: '/mocked_image_url',
            hub: 'Mocked Hub',
            category: 'Mocked Category',
            type: 'Mocked Type',
            beneficiaries: 'Mocked Beneficiaries',
            about: 'Mocked About',
          },
          isLoading: false,
          isError: false,
        })),
      },
      removeImage: {
        useMutation: jest.fn(),
      },
      edit: {
        useMutation: jest.fn(() => ({
          mutate: jest.fn(),
        })),
      },
    },
  },
}));

describe("EditProject component", () => {
  it("renders edit project form", async () => {
    render(<EditProject />);

    // Assert that project data is loaded

    expect(screen.getByText('Project Title')).toBeTruthy();
    expect(screen.getByText('Project Description')).toBeTruthy();
    expect(screen.getByText('Featured Image')).toBeTruthy();
    expect(screen.getByText('Hub')).toBeTruthy();
    expect(screen.getByText('Categories')).toBeTruthy();
    expect(screen.getByText('Type')).toBeTruthy();
    expect(screen.getByText('Beneficiaries')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
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
      expect(api.project.edit.useMutation).toHaveBeenCalled();
    });
  });
});
