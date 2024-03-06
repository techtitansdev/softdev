import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateBlogs from "../create";

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      create: {
        useMutation: jest
          .fn()
          .mockReturnValue([jest.fn().mockResolvedValue({}), {}]),
      },
    },
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeAll(() => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud-name";
});

describe("CreateBlogs", () => {
  it("renders without crashing", () => {
    render(<CreateBlogs />);
  });

  it("submits the form", async () => {
    const { getByText, getByTestId } = render(<CreateBlogs />);

    const blogTitleInput = getByTestId("blog-title-input");
    fireEvent.change(blogTitleInput, {
      target: { value: "Test Title" },
    });

    const blogDescriptionInput = getByTestId("blog-description-input");
    fireEvent.change(blogDescriptionInput, {
      target: { value: "Test Description" },
    });

    fireEvent.click(getByText(/Publish/i));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });
});
