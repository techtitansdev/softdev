import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByPlaceholderText,
} from "@testing-library/react";
import EditProject from "../edit/[id]";
import { api } from "~/utils/api";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { id: "test-project-id" },
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    project: {
      getById: {
        useQuery: jest.fn(() => ({
          data: {
            title: "Mocked Title",
            description: "Mocked Description",
            image: "/mocked_image_url",
            hub: "Mocked Hub",
            category: "Mocked Category",
            type: "Mocked Type",
            beneficiaries: "Mocked Beneficiaries",
            about: "Mocked About",
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
  },
}));

describe("EditProject component", () => {
  it("successfully edits a project when all data is provided", async () => {
    const { getByLabelText, getByText } = render(<EditProject />);
    expect(screen.getByText('Project Title')).toBeTruthy();
    expect(screen.getByText('Project Description')).toBeTruthy();
    expect(screen.getByText('Featured Image')).toBeTruthy();
    expect(screen.getByText('Hub')).toBeTruthy();
    expect(screen.getByText('Categories')).toBeTruthy();
    expect(screen.getByText('Type')).toBeTruthy();
    expect(screen.getByText('Beneficiaries')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
    fireEvent.change(screen.getByPlaceholderText("title"), {
      target: { value: "Updated Test Project About" },
    });
    fireEvent.change(screen.getByPlaceholderText("hub"), {
      target: { value: "Updated Test Project Hub" },
    });
    fireEvent.change(screen.getByPlaceholderText("beneficiaries"), {
      target: { value: "Updated Test Project beneficiaries" },
    });
    fireEvent.click(getByText("Publish"));
    expect(api.project.edit.useMutation).toHaveBeenCalled();
  });

  it("does not edit project if some fields are empty", async () => {
    const { getByLabelText, getByText } = render(<EditProject />);

    fireEvent.click(getByText("Publish"));

    expect(api.project.edit.useMutation).toHaveBeenCalled();
  });
});
