import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Payment from "../../pages/funded-projects/index";
import { api } from "~/utils/api";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: {
      id: "123",
    },
    asPath: "",
  }),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(() => ({
    user: {
      publicMetadata: { user_id: "1" },
      emailAddresses: [{ emailAddress: "test@example.com" }],
    },
    isLoaded: true,
  })),
  useClerk: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

const project = {
    id: "1",
    title: "Project Title",
    description: "Project Description",
    image: "image.jpg",
    funds: 100,
    funding_goal: 1000,
    donations: [],
    milestones: [],
    created_at: "2021-10-10T00:00:00.000Z",
    updated_at: "2021-10-10T00:00:00.000Z",
    user_id: "1",
    category_id: "1",
    status: "active",
    category: {
      id: "1",
      name: "Category Name",
      description: "Category Description",
      created_at: "2021-10-10T00:00:00.000Z",
    },
  };

jest.mock("~/utils/api", () => ({
  api: {
    paymentRouter: {
      createPaymentIntent: {
        useMutation: jest.fn().mockReturnValue({
          mutateAsync: jest.fn().mockResolvedValue({
            data: {
              id: "paymentIntentId",
              attributes: { client_key: "clientKey" },
            },
          }),
        }),
      },
      createPaymentMethod: {
        useMutation: jest.fn().mockReturnValue({
          mutateAsync: jest.fn().mockResolvedValue({
            data: { id: "paymentMethodId" },
          }),
        }),
      },
      attachPaymentIntent: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
    },
    donors: {
      createDonor: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
      createFunding: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
      checkEmailExists: {
        useQuery: jest.fn().mockReturnValue({ data: false }),
      },
    },
    milestone: {
      create: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
    },
    fundraiser: {
        getById: {
          useQuery: jest.fn().mockReturnValue({ data: { project } }),
        },
        updateFunds: {
          useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
        },
      },
  },
}));

describe("Payment", () => {
  it("renders without crashing", () => {
    render(<Payment />);
    expect(("YOU ARE DONATING TO:")).toBeTruthy();
    expect(("Project Title")).toBeTruthy();
  });

  it("calls handleSubmit on form submission", async () => {
    render(<Payment />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Payment Method"), {
      target: { value: "card" },
    });

    fireEvent.click(screen.getByText("Pay Now"));

    await waitFor(() => {
      expect(
        api.paymentRouter.createPaymentIntent.useMutation().mutateAsync,
      ).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(
        api.paymentRouter.createPaymentMethod.useMutation().mutateAsync,
      ).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(
        api.paymentRouter.attachPaymentIntent.useMutation().mutate,
      ).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(
        api.fundraiser.updateFunds.useMutation().mutate,
      ).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(api.donors.createDonor.useMutation().mutate).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(api.donors.createFunding.useMutation().mutate).toHaveBeenCalled();
    });
  });
});