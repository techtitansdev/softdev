import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "~/pages/admin/projects/components/ProjectCard";
import "@testing-library/jest-dom";

describe("ProjectCard component", () => {
  test("renders delete modal when delete button is clicked", () => {
    const projectData = {
      id: "1",
      title: "Sample Project",
      hub: "Sample Location",
      image: "sample-image.jpg",
    };

    const handleDelete = jest.fn();

    render(
      <ProjectCard projectData={projectData} handleDelete={handleDelete} />,
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const deleteModal = screen.getByText(
      `Are you sure you want to delete ${projectData.title}?`,
    );
    expect(deleteModal).toBeInTheDocument();
  });

  test("calls handleDelete function when delete button is confirmed in modal", async () => {
    const projectData = {
      id: "1",
      title: "Sample Project",
      hub: "Sample Location",
      image: "sample-image.jpg",
    };

    const handleDelete = jest.fn();

    render(
      <ProjectCard projectData={projectData} handleDelete={handleDelete} />,
    );
    const confirmDeleteButton = screen.getByText("Delete");
    fireEvent.click(confirmDeleteButton);
  });

  test("closes delete modal when cancel button is clicked", () => {
    const projectData = {
      id: "1",
      title: "Sample Project",
      hub: "Sample Location",
      image: "sample-image.jpg",
    };

    const handleDelete = jest.fn();

    render(
      <ProjectCard projectData={projectData} handleDelete={handleDelete} />,
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const deleteModal = screen.queryByText(
      `Are you sure you want to delete ${projectData.title}?`,
    );
    expect(deleteModal).not.toBeInTheDocument();
  });
});
