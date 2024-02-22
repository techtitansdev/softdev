import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FundingCard from "../components/FundingCard";

describe("FundingCard component", () => {
  const fundingData = {
    id: "1",
    project: {
      image: "/project-image-url",
      title: "Project Title",
      description: "Project Description",
    },
    donors: 10,
    funds: 1000,
    goal: 5000,
  };

  const handleDelete = jest.fn();

  test("renders correctly", () => {
    const { getByText, getByAltText } = render(
      <FundingCard fundingData={fundingData} handleDelete={handleDelete} />,
    );

    expect(getByText("Project Title")).toBeTruthy();
    expect(getByText("Project Description")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("₱1000")).toBeTruthy();
    expect(getByText("₱5000")).toBeTruthy();
  });
  test("renders image", () => {
    const { getByText, getByAltText } = render(
      <FundingCard fundingData={fundingData} handleDelete={handleDelete} />,
    );

    expect(getByAltText("funding-image")).toBeTruthy();
  });
});
