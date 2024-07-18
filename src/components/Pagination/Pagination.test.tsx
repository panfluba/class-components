import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  test('renders pagination component with correct number of buttons', () => {
    const { getAllByRole } = render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(5); // 50 items / 10 items per page = 5 pages
  });

  test('disables current page button', () => {
    const { getByText } = render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = getByText('3');
    expect(currentPageButton).toBeDisabled();
  });

  test('calls onPageChange with correct page number', () => {
    const { getByText } = render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextPageButton = getByText('2');
    fireEvent.click(nextPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
