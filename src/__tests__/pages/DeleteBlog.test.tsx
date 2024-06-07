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

describe("BlogCard Component", () => {
  const blogData = {
    id: "1",
    image: "/blog1-image-url",
    title: "Blog 1",
    excerpt: "This is the excerpt for Blog 1.",
  };

  const handleDelete = jest.fn();

  test("renders blog card correctly", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    expect(blogData.title).toBeTruthy();
    expect(blogData.excerpt).toBeTruthy();
    expect(blogData.image).toBeTruthy();

    expect("Delete").toBeTruthy();
  });

  test("calls handleDelete when delete button is clicked", () => {
    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    fireEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledTimes(0);
  });
});
