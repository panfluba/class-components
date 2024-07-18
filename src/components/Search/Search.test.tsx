import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  test('renders correctly', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <Search searchTerm="" onSearch={handleSearch} />,
    );
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('calls onSearch when input changes', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <Search searchTerm="" onSearch={handleSearch} />,
    );
    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'New Search' } });
    expect(handleSearch).toHaveBeenCalledWith('New Search');
  });
});
