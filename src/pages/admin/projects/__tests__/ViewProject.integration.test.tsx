import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../index";

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
            // Mock data for each project
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

it("Admin can view a collection of projects", async () => {
  const { getByText } = render(<Admin />);
  await waitFor(() => {
    // Check that the project titles are displayed
    expect(getByText("Project 1")).toBeInTheDocument();
    expect(getByText("Project 2")).toBeInTheDocument();
  });
});