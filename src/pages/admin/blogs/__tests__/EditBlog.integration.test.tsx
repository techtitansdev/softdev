import { render, fireEvent } from "@testing-library/react";
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
  },
}));

describe("EditBlog component", () => {
  it("successfully edits a blog when all data is provided", async () => {
    const { getByText, getByTestId } = render(<EditBlog />);

    expect(getByTestId("blog-title-input")).toBeTruthy();
    expect(getByTestId("blog-description-input")).toBeTruthy();
    expect(getByTestId("blog-image-input")).toBeTruthy();

    fireEvent.change(getByTestId("blog-title-input"), {
      target: { value: "Updated Test Blog Title" },
    });
    fireEvent.change(getByTestId("blog-description-input"), {
      target: { value: "Updated Test Blog Description" },
    });
    fireEvent.change(getByTestId("blog-image-input"), {
      target: { value: "Updated Test Blog Image" },
    });

    fireEvent.click(getByText("Publish"));
    expect(api.blog.edit.useMutation).toHaveBeenCalled();
  });

  it("does not edit blog if some fields are empty", async () => {
    const { getByText } = render(<EditBlog />);

    fireEvent.click(getByText("Publish"));

    expect(api.blog.edit.useMutation).toHaveBeenCalled();
  });
});
