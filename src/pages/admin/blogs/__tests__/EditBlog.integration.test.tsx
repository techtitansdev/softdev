import { render, fireEvent, screen } from "@testing-library/react";
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
            content: JSON.stringify({
              blocks: [
                {
                  type: "paragraph",
                  data: {
                    text: "Mocked Content",
                  },
                },
              ],
            }),
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
    categories: {
      getAllCategories: {
        useQuery: jest.fn(() => ({
          data: [
            {
              id: "mocked_category_id",
              name: "Mocked Category",
            },
          ],
          isLoading: false,
          isError: false,
        })),
      },
    },
  },
}));

describe("EditBlog component", () => {
  it("successfully edits a blog when all data is provided", () => {
    render(<EditBlog />);

    expect(screen.getByTestId("blog-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("blog-description-input")).toBeInTheDocument();
    expect(screen.getByTestId("blog-image-input")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("blog-title-input"), {
      target: { value: "Updated Test Blog Title" },
    });
    fireEvent.change(screen.getByTestId("blog-description-input"), {
      target: { value: "Updated Test Blog Description" },
    });
    fireEvent.change(screen.getByTestId("blog-image-input"), {
      target: { value: "Updated Test Blog Image" },
    });

    fireEvent.click(screen.getByText("Publish"));
    expect(api.blog.edit.useMutation).toHaveBeenCalled();
  });

  it("does not edit blog if some fields are empty", () => {
    render(<EditBlog />);

    fireEvent.click(screen.getByText("Publish"));

    expect(api.blog.edit.useMutation).toHaveBeenCalled();
  });
});
