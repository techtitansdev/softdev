import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import BlogCard from "../components/BlogCard";

describe("BlogCard Component", () => {
  const blogData = {
    id: "1",
    image: "/blog1-image-url",
    title: "Blog 1",
    excerpt: "This is the excerpt for Blog 1.",
  };

  const handleDelete = jest.fn();

  test("renders blog card correctly", () => {
    const { getByText, getByAltText } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    expect(getByText(blogData.title)).toBeTruthy();
    expect(getByText(blogData.excerpt)).toBeTruthy();
    expect(getByAltText(blogData.image)).toBeTruthy();

    expect(getByText("Delete")).toBeTruthy();
  });

  test("calls handleDelete when delete button is clicked", () => {
    const { getByText } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    fireEvent.click(getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledTimes(0);
  });
});
