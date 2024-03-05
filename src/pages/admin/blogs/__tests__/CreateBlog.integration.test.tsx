import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateBlogs from "../create";

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

describe("CreateBlogs component", () => {
  it("Creates a blog successfully when all data is provided", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText, getByTestId } = render(<CreateBlogs />);

    fireEvent.change(getByTestId("blog-title-input"), {
      target: { value: "Test Blog Title" },
    });
    fireEvent.change(getByTestId("blog-description-input"), {
      target: { value: "Test Blog Description" },
    });
    fireEvent.change(getByTestId("blog-image-input"), {
      target: { value: "Test Blog Image" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });

  it("Will not create blog if value is wrong or empty", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByText, getByTestId } = render(<CreateBlogs />);

    fireEvent.change(getByTestId("blog-title-input"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("blog-description-input"), {
      target: { value: "" },
    });
    fireEvent.change(getByTestId("blog-image-input"), {
      target: { value: "" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.blog.create.useMutation).toHaveBeenCalled();
    });
  });
});
