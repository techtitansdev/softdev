import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../index";


test("edit project form submission", async () => {
  render(<Admin />);

  // Fill in the form fields
  const titleInput = screen.getByLabelText(/Project Title/i);
  const descriptionInput = screen.getByLabelText(/Project Description/i);
  const hubInput = screen.getByLabelText(/Hub/i);
  const beneficiariesInput = screen.getByLabelText(/Beneficiaries/i);
  const saveDraftButton = screen.getByText(/Save as Draft/i);
  const publishButton = screen.getByText(/Publish/i);

  fireEvent.change(titleInput, { target: { value: "New Project Title" } });
  fireEvent.change(descriptionInput, { target: { value: "New Project Description" } });
  fireEvent.change(hubInput, { target: { value: "New Hub" } });
  fireEvent.change(beneficiariesInput, { target: { value: "New Beneficiaries" } });

  // Submit the form
  fireEvent.click(saveDraftButton);

  // Assert that the form is submitted successfully
  await screen.findByText(/Project Edited Successfully/i);

  // Assert that the form data is updated in the UI
  expect(screen.getByDisplayValue("New Project Title")).toBeInTheDocument();
  expect(screen.getByDisplayValue("New Project Description")).toBeInTheDocument();
  expect(screen.getByDisplayValue("New Hub")).toBeInTheDocument();
  expect(screen.getByDisplayValue("New Beneficiaries")).toBeInTheDocument();
});