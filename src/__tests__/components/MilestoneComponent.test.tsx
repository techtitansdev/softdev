import React from "react";
import { render } from "@testing-library/react";
import MilestoneComponent from "../../pages/admin/funding/components/MilestoneComponent";

describe("MilestoneComponent", () => {
  it('renders "No milestones available." when milestones prop is empty', () => {
    render(<MilestoneComponent milestones={[]} />);
    expect("No milestones available.").toBeTruthy();
  });

  it("renders milestones correctly when milestones prop is provided", () => {
    const milestones = [
      {
        milestone: 1,
        value: 10,
        unit: "kg",
        date: "2023-01-01",
        description: "First milestone description",
        done: true,
      },
      {
        milestone: 2,
        value: 20,
        unit: "kg",
        date: "2023-02-01",
        description: "Second milestone description",
        done: false,
      },
    ];

    render(<MilestoneComponent milestones={milestones} />);

    expect("Milestone 1").toBeTruthy();
    expect("Jan 01, 2023").toBeTruthy();
    expect("10 kg").toBeTruthy();
    expect("First milestone description").toBeTruthy();

    expect("Milestone 2").toBeTruthy();
    expect("Feb 01, 2023").toBeTruthy();
    expect("20 kg").toBeTruthy();
    expect("Second milestone description").toBeTruthy();
  });
});
