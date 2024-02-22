import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FundingCard from '../fundingCard';


describe('FundingCard component', () => {
  const fundingData = {
    id: '1',
    project: {
      image: '/project-image-url',
      title: 'Project Title',
      description: 'Project Description',
    },
    donors: 10,
    funds: 1000,
    goal: 5000,
  };

  const handleDelete = jest.fn();

  beforeEach(() => {
    render(<FundingCard fundingData={fundingData} handleDelete={handleDelete} />);
  });

  it('renders correctly', () => {
    expect(screen.getByAltText('funding-image')).toBeTruthy();
    expect(screen.getByText('Project Title')).toBeTruthy();
    expect(screen.getByText('Project Description')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('₱1000')).toBeTruthy();
    expect(screen.getByText('₱5000')).toBeTruthy();
  });

  
});
