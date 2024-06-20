import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../index";
import ProjectCard from "../components/ProjectCard";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mocking the useUser hook
jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn().mockReturnValue({
    user: {
      publicMetadata: {
        admin: "admin",
      },
    },
    isLoaded: true,
  }),
}));
jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getAll: {
        useQuery: jest.fn().mockReturnValue({
          data: [
            {
              id: "test_id",
              title: "Test Project Title",
              description: "Test Project Description",
              image: "/test-image-url",
            },
          ],
        }),
      },
      delete: {
        // Mock delete method
        useMutation: jest.fn(),
      },
    },
  },
}));



test("Project Cards is rendered", async () => {
  if (render(<Admin />)) {
    const projectData = [
      {
        id: "1",
        image: "/project1-image-url",
        title: "Project 1",
      },
      {
        id: "2",
        image: "/project2-image-url",
        title: "Project 2",
      },
      {
        id: "3",
        image: "/project3-image-url",
        title: "Project 3",
      },
    ];
    const handleDelete = jest.fn();
    const { getAllByText } = render(
      <>
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            handleDelete={handleDelete}
            projectData={project}
          />
        ))}
      </>,
    );

    projectData.forEach((project) => {
      expect(getAllByText(project.title)).toBeTruthy();
      expect(getAllByText("Edit")).toBeTruthy();
      expect(getAllByText("Delete")).toBeTruthy();
    });
  }
 
});


