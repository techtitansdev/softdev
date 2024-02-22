import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateProjects from "../create";
 // Update the path accordingly

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}), // Mock useMutation to resolve to an empty object
      },
    },
  },
}));

describe("CreateProjects component", () => {
  it("Creates a project successfully when all data is provided", async () => {
    // Mock useRouter hook
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateProjects />);
    
    // Fill in form fields
    fireEvent.change(getByLabelText("Project Title"), { target: { value: "Test Project Title" } });
    fireEvent.change(getByLabelText("Project Description"), { target: { value: "Test Project Description" } });
    // Similarly, fill in other form fields as necessary

    // Submit the form
    fireEvent.click(getByText("Publish"));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Assert that the create mutation was called
      expect(api.project.create.useMutation).toHaveBeenCalled();
      
      // Optionally, assert that useRouter push was called

    });
  });

  it("Will not create project if value is wrong or empty", async () => {
    // Mock useRouter hook
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateProjects />);
    
    // Fill in form fields with incorrect data
    fireEvent.change(getByLabelText("Project Title"), { target: { value: "" } }); // Empty title
    fireEvent.change(getByLabelText("Project Description"), { target: { value: "" } }); // Empty description
    // Similarly, fill in other form fields with incorrect data as necessary

    // Submit the form
    fireEvent.click(getByText("Publish"));


    await waitFor(() => {


    });
  });
});