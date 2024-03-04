import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { api } from "~/utils/api";
import { CldUploadButton } from "next-cloudinary";
import CreateFunding from "../create";

// Mocking external dependencies
jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getAllProjectTitles: {
        useQuery: jest.fn().mockReturnValue({
          refetch: jest.fn(),
          data: ["Project 1", "Project 2"], // Mock data for project titles
        }),
      },
      getByTitle: {
        useQuery: jest.fn().mockReturnValue({
          data: {
            id: "mocked_project_id",
            hub: "Test Hub",
            category: "Test Category",
            beneficiaries: "Test Beneficiaries",
            type: "Test Type",
            image: "/test-image-url",
            title: "Test Title",
            description: "Test Description",
            about: "Test About",
          },
        }),
      },
    },
    fundraiser: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}), // Mock useMutation to resolve to an empty object
      },
    },
  },
}));

describe("CreateFunding component", () => {
  it("Create a fundraiser project", async () => {
    // Mock useRouter hook
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    render(<CreateFunding />);
    
    // Fill in form fields
    userEvent.type(screen.getByLabelText("Fundraiser Title"), "Test Fundraiser Title");
    userEvent.type(screen.getByLabelText("Fundraiser Description"), "Test Fundraiser Description");
    // Similarly, fill in other form fields as necessary

    // Mock API call
    (api.fundraiser.create.useMutation as any).mockResolvedValueOnce({});

    // Submit the form
    fireEvent.click(screen.getByText("Publish"));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that the create mutation was called
      expect(api.fundraiser.create.useMutation).toHaveBeenCalled();
      
      // Optionally, assert that useRouter push was called
    
    });
  });

  
});



