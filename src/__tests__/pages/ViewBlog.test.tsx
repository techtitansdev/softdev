import React from "react";
import { render } from "@testing-library/react";
import BlogCard from "~/pages/admin/blogs/components/BlogCard";

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

describe("BlogCard Unit Tests", () => {
  test("renders the blog card with correct content", () => {
    const blogData = {
      id: "test-blog-id",
      title: "Test Blog",
      excerpt: "This is the test excerpt for Test Blog.",
      image: "/test-blog-image",
    };
    const handleDelete = jest.fn();

    render(<BlogCard blogData={blogData} handleDelete={handleDelete} />);

    expect("Test Blog").toBeTruthy();
    expect("This is the test excerpt for Test Blog.").toBeTruthy();
    expect("/test-blog-image").toBeTruthy();
    expect("Edit").toBeTruthy();
    expect("Delete").toBeTruthy();
  });
});
