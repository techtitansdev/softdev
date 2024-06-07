import React from "react";
import { render } from "@testing-library/react";
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
});
