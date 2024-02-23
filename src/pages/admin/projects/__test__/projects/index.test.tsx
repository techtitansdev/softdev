import React from "react";
import { render } from "@testing-library/react";
import ProjectCard from "../../components/ProjectCard";

describe("Collection of Projects", () => {
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

  test("renders project cards correctly", () => {
    const { getAllByText, getAllByAltText } = render(
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
  });

  test("renders correct images", () => {
    const { getAllByAltText } = render(
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
      expect(getAllByAltText(project.image)).toBeTruthy();
    });
  });
});
