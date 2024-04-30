import EditorOutput from "../../projects/components/editorOutput";
import ProjectDetailsPage from "../[id]";
import { render, waitFor } from "@testing-library/react";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "mocked_id" },
  }),
}));

// Mock useQuery
jest.mock("~/utils/api", () => ({
  api: {
    blog: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            // Mock blog data
            content: '{"blocks":[{"type":"paragraph","data":{"text":"Project about section chuchu"}}]}',
          },
        })),
      },
    },
  },
}));

const content = [{"blocks":[{"type":"paragraph","data":{"text":"Project about section chuchu"}}]}]
describe("ProjectDetailsPage", () => {
  it("renders project details", async () => {
   render(<EditorOutput content={content} />);


  });
});
