import React from "react";
import { render, screen } from "@testing-library/react";
import FundingCard from "../FundingCard";

describe("FundingCard", () => {
  const mockFundingData = {
    id: "1",
    title: "Project 1",
    image: "https://example.com/project1.jpg",
    hub: "Test Hub",
    donors: "10",
    raised: "1000",
    goal: "5000",
  };

  test("renders project card with correct data", () => {
    render(
      <FundingCard fundingData={mockFundingData} handleDelete={() => {}} />,
    );

    expect(screen.getByText("Project 1")).toBeTruthy();
    expect(screen.getByText("Test Hub")).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("₱1000")).toBeTruthy();
    expect(screen.getByText("₱5000")).toBeTruthy();
    expect(screen.getByAltText("project-image")).toBeTruthy();
  });
});
