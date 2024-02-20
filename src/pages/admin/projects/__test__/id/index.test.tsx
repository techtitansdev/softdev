import ProjectDetailsPage from "../../[id]";
import { render } from "@testing-library/react";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

// Mock useQuery
jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            // Mock project data
            about: "<p>Project about section chuchu</p>",
          },
          refetch: jest.fn(),
        })),
      },
    },
  },
}));

describe("ProjectDetailsPage", () => {
  it("renders project details", async () => {
    const { findByText } = render(<ProjectDetailsPage />);

    // Wait for the project content to be rendered
    const projectContents = await findByText("Project about section chuchu");

    // Assert that the project content is rendered
    expect(projectContents).toBeTruthy();
  });
});
