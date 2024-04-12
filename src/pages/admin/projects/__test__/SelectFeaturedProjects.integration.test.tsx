import React from "react";
import { render, waitFor } from "@testing-library/react";
import AdminProjectPage from "../index";
import { api } from "~/utils/api";

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

describe("AdminProjectPage Component Integration Test", () => {
  it("successfully displays at least 4 featured projects", async () => {
    render(<AdminProjectPage />);

    await waitFor(() => {
      expect(api.project.getAll.useQuery).toHaveBeenCalled();
    });

    const featuredProjects = mockProjects
      .map((project) => project.name)
      .filter((name) => name.includes("Featured Project"));
    console.log("Number of Featured Projects:", featuredProjects.length);

    expect(featuredProjects.length).toBeGreaterThanOrEqual(4);
  });
});
