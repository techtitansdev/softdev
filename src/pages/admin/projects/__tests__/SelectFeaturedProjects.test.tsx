import React from "react";
import { render } from "@testing-library/react";
import AdminProjectPage from "../index";

const mockProjects = [
  { id: "1", featured: true, name: "Featured Project 1" },
  { id: "2", featured: false, name: "Non-Featured Project 1" },
  { id: "3", featured: true, name: "Featured Project 2" },
  { id: "4", featured: false, name: "Non-Featured Project 2" },
  { id: "5", featured: true, name: "Featured Project 3" },
  { id: "6", featured: false, name: "Non-Featured Project 3" },
];

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getAll: {
        useQuery: jest.fn(() => ({
          data: mockProjects,
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

describe("AdminProjectPage Component", () => {
  it("should display at least 4 featured projects", () => {
    render(<AdminProjectPage />);

    const featuredProjects = mockProjects
      .map((project) => project.name)
      .filter((name) => name.includes("Featured Project"));

    expect(featuredProjects.length).toBeGreaterThanOrEqual(4);
  });
});
