import { render, fireEvent, waitFor } from "@testing-library/react";
import { api } from "~/utils/api";
import CreateProjects from "../create";

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      create: {
        useMutation: jest.fn().mockResolvedValue({}),
      },
    },
    categories: {
      create: {
        useMutation: jest.fn(),
      },
      getAllCategories: {
        useQuery: jest.fn().mockReturnValue({ data: [] }),
      },
    },
  },
}));

describe("CreateProjects component", () => {
  it("Creates a project successfully when all data is provided", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateProjects />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "Test Project Title" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "Test Project Description" },
    });

    fireEvent.click(getByText("Publish"));

    await waitFor(() => {
      expect(api.project.create.useMutation).toHaveBeenCalled();
    });
  });

  it("Will not create project if value is wrong or empty", async () => {
    const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    const pushMock = jest.fn();
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByLabelText, getByText } = render(<CreateProjects />);

    fireEvent.change(getByLabelText("Project Title"), {
      target: { value: "" },
    });
    fireEvent.change(getByLabelText("Project Description"), {
      target: { value: "" },
    });

    fireEvent.click(getByText("Publish"));
  });
});
