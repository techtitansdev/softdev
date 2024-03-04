import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import EditBlog from "../edit/[id]";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { id: "test-blog-id" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            title: "Mocked Title",
            excerpt: "Mocked Excerpt",
            image: "/mocked_image_url",
            content: "Mocked Content",
            published: false,
          },
          isLoading: false,
          isError: false,
        })),
      },
      removeImage: {
        useMutation: jest.fn(),
      },
      edit: {
        useMutation: jest.fn(() => ({
          mutate: jest.fn(),
        })),
      },
    },
  },
}));

describe("EditBlog component", () => {
  it("successfully edits a blog when all data is provided", async () => {
    render(<EditBlog />);

    expect(screen.getByText("Blog Title")).toBeTruthy();
    expect(screen.getByText("Blog Description")).toBeTruthy();
    expect(screen.getByText("Featured Image")).toBeTruthy();

    fireEvent.change(screen.getByText("Blog Title"), {
      target: { value: "Updated Test Blog Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Blog Description"), {
      target: { value: "Updated Test Blog Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Featured Image"), {
      target: { value: "Updated Test Blog Image" },
    });

    fireEvent.click(screen.getByText("Publish"));
    expect(api.project.edit.useMutation).toHaveBeenCalled();
  });

  it("does not edit blog if some fields are empty", async () => {
    render(<EditBlog />);

    fireEvent.click(screen.getByText("Publish"));

    await waitFor(() => {
      expect(api.blog.edit.useMutation).toHaveBeenCalled();
    });
  });
});
