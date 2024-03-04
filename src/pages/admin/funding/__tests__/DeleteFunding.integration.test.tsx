import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FundingCard from "../components/FundingCardComponent";

describe("FundingCard Integration Test", () => {
  const fundingData = {
    id: "1",
    project: {
      title: "Project 1",
      image: "https://example.com/project1.jpg",
      description: "Project 1 description",
    },
    donors: 10,
    funds: 1000,
    goal: 5000,
  };

  const handleDelete = jest.fn();

  test("renders project card with correct data and interacts with delete modal", async () => {
    const { getByText } = render(
      <FundingCard fundingData={fundingData} handleDelete={handleDelete} />,
    );

    expect(getByText(fundingData.project.title)).toBeTruthy();
    expect(getByText(fundingData.project.description)).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("₱1000")).toBeTruthy();
    expect(getByText("₱5000")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();

    fireEvent.click(getByText("Delete"));
  });
});
