import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CommentComponent from "../components/CommentComponent";
import Funding from "../[id]";

jest.mock("~/components/Navbar", () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar"></div>,
}));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        id: "1",
      },
    };
  },
}));

jest.mock("~/utils/api", () => ({
  api: {
    fundraiser: {
      getById: {
        useQuery: jest.fn().mockReturnValue({ data: {} }),
      },
    },
    payment: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    user: {
      getByEmail: {
        useQuery: jest.fn().mockReturnValue({ data: { id: "1" } }),
      },
    },
    feedback: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
      getAll: {
        useQuery: jest.fn().mockResolvedValue({}),
      },
    },
  },
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: { publicMetadata: { user_id: "1" } },
    isLoaded: true,
  })),
  useClerk: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

describe("Funding page", () => {
  test("allows user to leave a comment", async () => {
    const { getByText } = render(<Funding />);

    fireEvent.click(getByText("COMMENT"));
    const postButton = getByText("Post");

    fireEvent.change(screen.getByTestId("Leave a Comment"), {
      target: { value: "This is a test comment." },
    });

    fireEvent.click(postButton);
  });
});

describe("CommentComponent", () => {
  test("renders comment component correctly", () => {
    const { getByText } = render(<CommentComponent projectId={""} />);

    expect(getByText("Leave a Comment")).toBeTruthy();
    expect(getByText("Post")).toBeTruthy();
  });
});
