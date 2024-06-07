import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateBlogs from "../../pages/admin/blogs/create";

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

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { admin: "admin" } },
    isLoaded: true,
  })),
  useClerk: () => ({
    signOut: jest.fn(),
  }),
}));

beforeAll(() => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "test-cloud-name";
});

describe("CreateBlogs", () => {
  const editorDiv = document.createElement("div");
  editorDiv.id = "editor";
  document.body.appendChild(editorDiv);

  it("renders without crashing", () => {
    render(<CreateBlogs />);

    expect(CreateBlogs).toBeTruthy();
  });

  it("submits the form", async () => {
    render(<CreateBlogs />);

    fireEvent.change(screen.getByTestId("blog-title-input"));

    fireEvent.change(screen.getByTestId("blog-description-input"));

    fireEvent.click(screen.getByText(/Publish/i));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });
});
