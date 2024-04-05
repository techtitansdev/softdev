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

  test("opens delete modal when delete button is clicked", () => {
    const { getByText, getByTestId } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByTestId("modal-subject")).toBeTruthy();
  });

  test("calls handleDelete function when delete button is clicked in modal", () => {
    const { getByText } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(handleDelete).toHaveBeenCalledTimes(0);
  });

  test("closes modal when cancel button is clicked", async () => {
    const { getByText } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Cancel"));
  });
});
