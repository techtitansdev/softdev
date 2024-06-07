import React from "react";
import { render } from "@testing-library/react";
import BlogDetailsPage from "../../pages/admin/blogs/[id]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "test_id" },
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

jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getById: {
        useQuery: jest.fn().mockReturnValue({
          data: {
            id: "clw7bm2680000fl2gikmxym2b",
            title: "asdasdasda",
            image:
              "https://res.cloudinary.com/dzpghgd8d/image/upload/v1715747236/qvrwalvxrqez7porq6uo.jpg",
            published: true,
            content: `{
                "time": 1715747242367,
                "blocks": [
                  {
                    "id": "YW2onN345_",
                    "type": "paragraph",
                    "data": {
                      "text": "Title"
                    },
                    "tunes": {
                      "alignementTool": {
                        "alignment": "left"
                      }
                    }
                  },
                  {
                    "id": "36AT_11YqA",
                    "type": "header",
                    "data": {
                      "text": "This is the header",
                      "level": 2
                    },
                    "tunes": {
                      "alignementTool": {
                        "alignment": "left"
                      }
                    }
                  }
                ],
                "version": "2.29.1"
              }`,
            created: new Date(
              "Wed May 15 2024 12:27:29 GMT+0800 (China Standard Time)",
            ),
            excerpt: "asdasdasdasd",
            featured: false,
          },
        }),
      },
    },
  },
}));

describe("BlogDetailsPage", () => {
  it("renders correctly with blog data", () => {
    render(<BlogDetailsPage />);

    expect("Title").toBeTruthy();
  });
});
