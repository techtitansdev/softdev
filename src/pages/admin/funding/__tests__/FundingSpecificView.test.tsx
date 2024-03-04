import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FundingPage from "../[id]";


jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "test_id" }, // Mock the router query object
  }),
}));

jest.mock("~/utils/api", () => ({
  api: {
    fundraiser: {
      getById: {
        useQuery: jest.fn().mockReturnValue({
          data: {
            id: "test_id",
            project: {
              title: "Test Project Title",
              description: "Test Project Description",
              image: "/test-image-url",
            },
            donors: 0,
            goal: 10000,
            targetDate: "2024-12-31",
            funds: 5000,
          },
        }),
      },
    },
  },
}));

describe("FundingPage component", () => {
  it("renders with funding data", async () => {
    render(<FundingPage />);

    // Wait for the page to load and data to be fetched

      expect(screen.getByText("Test Project Title")).toBeTruthy();
      expect(screen.getByText("Test Project Description")).toBeTruthy();
      expect(screen.getByText("Donate")).toBeTruthy();
      expect(screen.getByText("Beneficiaries")).toBeTruthy();
      expect(screen.getByText("Goal: ₱10000")).toBeTruthy();
      expect(screen.getByAltText("Project Image")).toBeTruthy();
    });
  });

  // You can add more test cases to cover different scenarios, such as content switching, etc.
  
  
  jest.mock("next/router", () => ({
    useRouter: () => ({
      query: { id: "test_id" }, // Mock the router query object
    }),
  }));
  

    // You can add more test cases to cover different scenarios, such as content switching, etc.
