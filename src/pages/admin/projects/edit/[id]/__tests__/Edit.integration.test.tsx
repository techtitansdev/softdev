import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditProject } from "../index";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

jest.mock("~utils/api", () => ({
  project: {
    getById: {
      useQuery: () => [
        {
          data: { id: "1", name: "Test Project" },
          error: null,
          status: "success",
        },
        () => {},
      ],
    },
    removeImage: {
      useMutation: () => [
        { data: null, error: null, status: "idle" },
        () => {},
      ],
    },
  },
}));

describe("EditProject Integration Test", () => {
  it("submits form with correct data", async () => {
    const projectData = {};
    render(<EditProject />);

    const nameInput = screen.getByLabelText("Project Name");
    fireEvent.change(nameInput, { target: { value: "Updated Project" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.project.edit.useMutation).toHaveBeenCalledWith({
        id: "mocked_id",
        published: false,
        image: "",
        ...projectData,
      });
    });
  });
});
