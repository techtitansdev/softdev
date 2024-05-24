import { render, fireEvent, waitFor } from "@testing-library/react";
import Payment from "../[id]";
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
};

jest.mock("~/utils/api", () => ({
  api: {
    fundraiser: {
      getById: {
        useQuery: jest.fn().mockReturnValue({ data: { project } }),
      },
      updateFunds: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
    },
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
  },
}));

describe("Payment", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Payment />);
    expect(getByText("YOU ARE DONATING TO:")).toBeInTheDocument();
    expect(getByText("Project Title")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submission", async () => {
    const { getByPlaceholderText, getByText } = render(<Payment />);

    fireEvent.change(getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(getByPlaceholderText("Payment Method"), {
      target: { value: "card" },
    });

    const payNowButton = getByText("Pay Now");
    fireEvent.click(payNowButton);

    await waitFor(() => {
      expect(
        api.paymentRouter.createPaymentIntent.useMutation().mutateAsync,
      ).toHaveBeenCalled();
      expect(
        api.paymentRouter.createPaymentMethod.useMutation().mutateAsync,
      ).toHaveBeenCalled();
      expect(
        api.paymentRouter.attachPaymentIntent.useMutation().mutate,
      ).toHaveBeenCalled();
      expect(
        api.fundraiser.updateFunds.useMutation().mutate,
      ).toHaveBeenCalled();
      expect(api.donors.createDonor.useMutation().mutate).toHaveBeenCalled();
      expect(api.donors.createFunding.useMutation().mutate).toHaveBeenCalled();
    });
  });
});
