import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogCard from "../components/BlogCard";

describe("BlogCard component", () => {
  const blogData = {
    id: "1",
    title: "Blog Title",
    description: "Blog Description",
    image: "/blog-image-url",
  };

  const handleDelete = jest.fn();

  test("renders correctly", () => {
    const { getByTestId } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    expect(getByTestId("blog-title-input")).toBeTruthy();
    expect(getByTestId("blog-description-input")).toBeTruthy();
  });
  test("renders image", () => {
    const { getByTestId } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    expect(getByTestId("blog-image")).toBeTruthy();
  });
});
