import React from "react";
import { render, waitFor } from "@testing-library/react";
import AdminBlogPage from "../index";
import { api } from "~/utils/api";

const mockBlogs = [
  { id: "1", featured: true, title: "Featured Blog 1" },
  { id: "2", featured: false, title: "Non-Featured Blog 1" },
  { id: "3", featured: true, title: "Featured Blog 2" },
  { id: "4", featured: false, title: "Non-Featured Blog 2" },
  { id: "5", featured: true, title: "Featured Blog 3" },
  { id: "6", featured: false, title: "Non-Featured Blog 3" },
];

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getAll: {
        useQuery: jest.fn(() => ({
          data: mockBlogs,
        })),
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

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
}));

describe("AdminBlogPage Integration Test - Select Featured Blogs", () => {
  it("successfully displays only the first four featured blogs", async () => {
    const { getAll } = api.blog;

    const { getByText, queryByText } = render(<AdminBlogPage />);

    await waitFor(() => {
      expect(getAll.useQuery).toHaveBeenCalled();
    });

    const featuredBlogTitles = mockBlogs
      .filter((blog) => blog.featured)
      .slice(0, 4)
      .map((blog) => blog.title);

    featuredBlogTitles.forEach((title) => {
      expect(getByText(title)).toBeTruthy();
    });

    mockBlogs
      .filter(
        (blog) => blog.featured && !featuredBlogTitles.includes(blog.title),
      )
      .forEach((blog) => {
        expect(queryByText(blog.title)).toBeNull();
      });
  });
});
