import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        useMutation: jest.fn().mockResolvedValue({}), // Resolve with an empty object
      },
    },
  },
}));

describe("EditBlog component", () => {
  it("submits the form with correct data", async () => {
    const { getByText, getByTestId } = render(<EditBlog />);

    // Update form fields with new data
    userEvent.type(getByTestId("blog-title-input"), "New Title");
    userEvent.type(getByTestId("blog-description-input"), "New Excerpt");

    // Trigger form submission
    fireEvent.click(getByText(/Save as Draft/i));

    // Check that the edit mutation is called with the correct data
    await waitFor(() => {
      expect(api.blog.edit.useMutation).toHaveBeenCalledWith({
        title: "New Title",
        excerpt: "New Excerpt",
        image: "/mocked_image_url",
        content: "Mocked Content",
        published: false,
        id: "mocked_id",
      });
    });
  });
});
