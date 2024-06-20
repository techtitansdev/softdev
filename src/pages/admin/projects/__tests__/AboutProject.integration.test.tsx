import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { NewEditor } from "~/components/editor/Editor";

describe("NewEditor Integration Test", () => {
  test("renders editor component and interacts correctly within the application context", async () => {
    const onChanges = jest.fn();

    const { getByTestId, getByText } = render(
      <NewEditor onChanges={onChanges} />,
    );

    await waitFor(() => {
      document.getElementById("editor");
    });

    onChanges("Test content");

    expect(onChanges).toHaveBeenCalledWith("Test content");
  });
});
