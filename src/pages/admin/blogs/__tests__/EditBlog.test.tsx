import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { api } from "~/utils/api";
import EditBlog from "../edit/[id]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
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
  it("renders edit blog form", async () => {
    render(<EditBlog />);

    expect(screen.getByText("Blog Title")).toBeTruthy();
    expect(screen.getByText("Blog Description")).toBeTruthy();
    expect(screen.getByAltText("Mocked Title")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("submits the form with correct data", async () => {
    render(<EditBlog />);

    userEvent.type(screen.getByText(/Blog Title/i), "New Title");
    userEvent.type(screen.getByText(/Blog Description/i), "New Excerpt");

    fireEvent.click(screen.getByText(/Save as Draft/i));

    await waitFor(() => {
      expect(api.blog.edit.useMutation).toHaveBeenCalled();
    });
  });
});
