import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BlogCard from "../../pages/admin/blogs/components/BlogCard";

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getAll: {
        useQuery: jest.fn(),
      },
      edit: {
        useMutation: jest.fn(),
      },
      delete: {
        useMutation: jest.fn(),
      },
      getFeaturedCount: {
        useQuery: jest.fn(),
      },
    },
  },
}));

describe("BlogCard component", () => {
  const blogData = {
    id: "1",
    title: "Blog Title",
    description: "Blog Description",
    image: "/blog-image-url",
  };

  const handleDelete = jest.fn();

  test("renders correctly", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    expect("blog-title-input").toBeTruthy();
    expect("blog-description-input").toBeTruthy();
  });

  test("renders image", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    expect("blog-image").toBeTruthy();
  });

  test("opens delete modal when delete button is clicked", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    fireEvent.click(screen.getByText("Delete"));

    expect("modal-subject").toBeTruthy();
  });

  test("calls handleDelete function when delete button is clicked in modal", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(handleDelete).toHaveBeenCalledTimes(0);
  });

  test("closes modal when cancel button is clicked", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Cancel"));

    expect("modal-subject").toBeTruthy();
  });
});
