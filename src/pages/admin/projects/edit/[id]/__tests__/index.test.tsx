import { render, screen, fireEvent } from '@testing-library/react';
import { EditProject } from "../index";

describe('EditProject', () => {
  test('renders project title input', () => {
    render(<EditProject />);
    const projectTitleInput = screen.getByLabelText('Project Title');
    expect(projectTitleInput).toBeInTheDocument();
  });

  test('renders project description input', () => {
    render(<EditProject />);
    const projectDescriptionInput = screen.getByLabelText('Project Description');
    expect(projectDescriptionInput).toBeInTheDocument();
  });

  test('renders featured image input', () => {
    render(<EditProject />);
    const featuredImageInput = screen.getByLabelText('Featured Image');
    expect(featuredImageInput).toBeInTheDocument();
  });

  test('renders hub input', () => {
    render(<EditProject />);
    const hubInput = screen.getByLabelText('Hub');
    expect(hubInput).toBeInTheDocument();
  });

  test('renders categories input', () => {
    render(<EditProject />);
    const categoriesInput = screen.getByLabelText('Categories');
    expect(categoriesInput).toBeInTheDocument();
  });

  test('renders type input', () => {
    render(<EditProject />);
    const typeInput = screen.getByLabelText('Type');
    expect(typeInput).toBeInTheDocument();
  });

  test('renders beneficiaries input', () => {
    render(<EditProject />);
    const beneficiariesInput = screen.getByLabelText('Beneficiaries');
    expect(beneficiariesInput).toBeInTheDocument();
  });

  test('renders about input', () => {
    render(<EditProject />);
    const aboutInput = screen.getByLabelText('About');
    expect(aboutInput).toBeInTheDocument();
  });

  test('renders save as draft button', () => {
    render(<EditProject />);
    const saveAsDraftButton = screen.getByRole('button', { name: /Save as Draft/i });
    expect(saveAsDraftButton).toBeInTheDocument();
  });

  test('renders publish button', () => {
    render(<EditProject />);
    const publishButton = screen.getByRole('button', { name: /Publish/i });
    expect(publishButton).toBeInTheDocument();
  });

  test('handles form submission', () => {
    render(<EditProject />);
    const saveAsDraftButton = screen.getByRole('button', { name: /Save as Draft/i });
    const publishButton = screen.getByRole('button', { name: /Publish/i });

    fireEvent.click(saveAsDraftButton);
    fireEvent.click(publishButton);

    expect(saveAsDraftButton).toHaveBeenCalled();
    expect(publishButton).toHaveBeenCalled();
  });
});
