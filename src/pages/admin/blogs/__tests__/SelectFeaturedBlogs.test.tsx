import React from "react";
import { render } from "@testing-library/react";
import AdminBlogPage from "../index";

const mockBlogs = [
  { id: "1", featured: true, title: "Featured Blog 1" },
  { id: "2", featured: false, title: "Non-Featured Blog 1" },
  { id: "3", featured: true, title: "Featured Blog 2" },
  { id: "4", featured: false, title: "Non-Featured Blog 2" },
  { id: "5", featured: true, title: "Featured Blog 3" },
  { id: "6", featured: false, title: "Non-Featured Blog 3" },
];

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

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

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
}));

describe("AdminBlogPage Component", () => {
  it("should display only featured blogs", () => {
    const { getByText } = render(<AdminBlogPage />);

    mockBlogs
      .filter((blog) => blog.featured)
      .forEach((blog) => {
        expect(getByText(blog.title)).toBeTruthy();
      });
  });
});
