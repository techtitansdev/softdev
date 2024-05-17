import React from "react";
import { render } from "@testing-library/react";

import { api } from "~/utils/api";
import Blogs from "~/pages/blogs";
import BlogCard from "../components/BlogCard";



// Mocking the useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    isFallback: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

jest.mock("@clerk/nextjs", () => {
    const originalModule = jest.requireActual("@clerk/nextjs");
    return {
      ...originalModule,
      useClerk: jest.fn(() => ({
        user: { publicMetadata: { admin: "admin" } },
        isLoaded: true,
      })),
      useUser: jest.fn(() => ({
        user: { publicMetadata: { admin: "admin" } },
        isLoaded: true,
      })),
    };
  });

  interface BlogData {
    id: string;
    title: string;
    image: string;
    excerpt: string;
    featured: boolean;
    created: Date;
  }
  
  

// Mocking the API call
jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getAll: {
        useQuery: () => ({
          data: [
            {
              id: 1,
              title: "Featured Blog",
              featured: true,
            },
            {
              id: 2,
              title: "Unfeatured Blog",
              featured: false,
            },
          ],
        }),
      },
    },
  },
}));

describe("Blogs Component", () => {
    let mockData: BlogData[];
  
    beforeEach(() => {
      mockData = [
        {
          id: "1",
          title: "Featured Blog 1",
          image: "image1.jpg",
          excerpt: "Excerpt 1",
          featured: true,
          created: new Date(),
        },
        {
          id: "2",
          title: "Unfeatured Blog 1",
          image: "image2.jpg",
          excerpt: "Excerpt 2",
          featured: false,
          created: new Date(),
        },
        {
          id: "3",
          title: "Unfeatured Blog 2",
          image: "image3.jpg",
          excerpt: "Excerpt 3",
          featured: false,
          created: new Date(),
        },
      ];
    });
  
    it("renders featured and unfeatured blog cards", async () => {
      // Render featured blog card
      if (mockData[0]) {
        render(<BlogCard blogData={mockData[0]} />);
        // Your test assertions for featured blog card can go here
      } else {
        throw new Error("Featured blog data is undefined");
      }
  
      // Render unfeatured blog card
      if (mockData[1]) {
        render(<BlogCard blogData={mockData[1]} />);
        // Your test assertions for unfeatured blog card can go here
      } else {
        throw new Error("Unfeatured blog data is undefined");
      }
    });
  });


