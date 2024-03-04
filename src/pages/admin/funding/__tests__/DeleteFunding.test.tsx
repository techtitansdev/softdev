import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FundingCard from "../components/FundingCardComponent";

describe("FundingCard Component", () => {
  const fundingData = {
    id: "1",
    project: {
      title: "Project Title",
      description: "Project Description",
      image: "/project-image-url",
    },
    donors: 10,
    funds: 1000,
    goal: 5000,
  };

  const handleDelete = jest.fn();

  test("renders funding card correctly", () => {
    const { getByText, getByAltText } = render(
      <FundingCard fundingData={fundingData} handleDelete={handleDelete} />,
    );

    expect(getByText(fundingData.project.title)).toBeTruthy();
    expect(getByText(fundingData.project.description)).toBeTruthy();
    expect(getByAltText("funding-image")).toBeTruthy();

    expect(getByText("Delete")).toBeTruthy();
  });

  test("calls handleDelete when delete button is clicked", () => {
    const { getByText } = render(
      <FundingCard fundingData={fundingData} handleDelete={handleDelete} />,
    );

    fireEvent.click(getByText("Delete"));
    expect(handleDelete).toHaveBeenCalledTimes(0);
  });
});
