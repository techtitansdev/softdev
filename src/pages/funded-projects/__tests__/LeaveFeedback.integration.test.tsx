import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Funding from "../[id]";
import CommentComponent from "../components/CommentComponent";

describe("Funding page - Integration Test", () => {
  test("allows user to leave a comment", async () => {
    render(
      <MockedProvider mocks={[]}>
        <Funding />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText("COMMENT"));
    const postButton = screen.getByText("Post");

    fireEvent.change(screen.getByTestId("Leave a Comment"), {
      target: { value: "This is a test comment." },
    });

    fireEvent.click(postButton);
  });
});

describe("CommentComponent - Integration Test", () => {
  test("renders comment component correctly", () => {
    render(
      <MockedProvider mocks={[]}>
        <CommentComponent />
      </MockedProvider>
    );

    expect(screen.getByText("Leave a Comment")).toBeTruthy();
    expect(screen.getByText("Post")).toBeTruthy();
  });
});