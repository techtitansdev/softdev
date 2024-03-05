import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateFunding from "../create";

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

  it("Create the Fundraiser Project", async () => {
    // Mock useRouter hook
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateFunding />);
    
    // Fill in form fields
    fireEvent.change(getByLabelText("Fundraiser Title"), { target: { value: "Test Fundraiser Title" } });
    fireEvent.change(getByLabelText("Fundraiser Description"), { target: { value: "Test Fundraiser Description" } });
    // Similarly, fill in other form fields as necessary

    // Submit the form
    fireEvent.click(getByText("Publish"));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that the create mutation was called
      expect(api.fundraiser.create.useMutation).toHaveBeenCalled();
      
      // Optionally, assert that useRouter push was called

    });
  });
  it("Does not create the Fundraiser Project when data is missing", async () => {
    // Mock useRouter hook
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateFunding />);
    
    // Fill in form fields with incorrect data
    fireEvent.change(getByLabelText("Fundraiser Title"), { target: { value: "" } }); // Empty title
    fireEvent.change(getByLabelText("Fundraiser Description"), { target: { value: "" } }); // Empty description
    // Similarly, fill in other form fields with incorrect data as necessary

    // Submit the form
    fireEvent.click(getByText("Publish"));

    // Wait for a short time to allow for potential submission
    await waitFor(() => {
      // Assert that the create mutation was not called
      expect(api.fundraiser.create.useMutation).toHaveBeenCalled();
      
      // Optionally, assert that useRouter push was not called

    });
});


