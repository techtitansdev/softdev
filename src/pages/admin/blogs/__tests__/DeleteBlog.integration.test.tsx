import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import BlogCard from "../components/BlogCard";

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

describe("BlogCard Integration Test", () => {
  const blogData = {
    id: "1",
    image: "/blog1-image-url",
    title: "Blog 1",
    excerpt: "This is the excerpt for Blog 1.",
  };

  const handleDelete = jest.fn();

  test("renders blog card correctly and interacts with delete modal", async () => {
    const { getByText, queryByText } = render(
      <BlogCard blogData={blogData} handleDelete={handleDelete} />,
    );

    expect(getByText(blogData.title)).toBeTruthy();
    expect(getByText(blogData.excerpt)).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();

    fireEvent.click(getByText("Delete"));

    await waitFor(() => {
      expect(
        queryByText("Are you sure you want to delete Blog 1?"),
      ).toBeTruthy();
    });
  });
});
