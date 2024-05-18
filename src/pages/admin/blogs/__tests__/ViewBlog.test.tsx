import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogCard from "~/pages/admin/blogs/components/BlogCard";

describe("BlogCard Unit Tests", () => {
  test("renders the blog card with correct content", () => {
    const blogData = {
      id: "test-blog-id",
      title: "Test Blog",
      excerpt: "This is the test excerpt for Test Blog.",
      image: "/test-blog-image",
    };
    const handleDelete = jest.fn();

    const { getByText, getByAltText, getByRole } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />
    );

    expect(getByText("Test Blog")).toBeTruthy();
    expect(getByText("This is the test excerpt for Test Blog.")).toBeTruthy();
    expect(getByAltText("/test-blog-image")).toBeTruthy();
    expect(getByRole("button", { name: "Edit" })).toBeTruthy();
    expect(getByRole("button", { name: "Delete" })).toBeTruthy();
  });

  test("calls handleDelete when delete button is clicked", () => {
    const blogData = {
      id: "test-blog-id",
      title: "Test Blog",
      excerpt: "This is the test excerpt for Test Blog.",
      image: "/test-blog-image",
    };
    const handleDelete = jest.fn();

    const { getByRole } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />
    );

    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(handleDelete).toHaveBeenCalledWith(blogData.id);
  });
});
