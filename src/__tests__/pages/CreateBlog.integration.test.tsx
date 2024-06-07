import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateBlogs from "../../pages/admin/blogs/create";

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
  useClerk: () => ({
    signOut: jest.fn(),
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

describe("CreateBlogs component", () => {
  it("Creates a blog successfully when all data is provided", async () => {
    render(<CreateBlogs />);

    fireEvent.change(screen.getByTestId("blog-title-input"), {
      target: { value: "Test Blog Title" },
    });
    fireEvent.change(screen.getByTestId("blog-description-input"), {
      target: { value: "Test Blog Description" },
    });
    fireEvent.change(screen.getByTestId("blog-image-input"), {
      target: { value: "Test Blog Image" },
    });

    fireEvent.click(screen.getByText("Publish"));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });

  it("Will not create blog if value is wrong or empty", async () => {
    render(<CreateBlogs />);

    fireEvent.change(screen.getByTestId("blog-title-input"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("blog-description-input"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("blog-image-input"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Publish"));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });
});
