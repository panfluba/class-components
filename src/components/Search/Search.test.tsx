import { render, fireEvent } from '@testing-library/react';
import Search from './Search';
import '@testing-library/jest-dom/extend-expect'; // Импорт jest-dom

describe('Search Component', () => {
  it('saves the entered value to the local storage on search', () => {
    const handleSearch = jest.fn();
    const { getByRole } = render(
      <Search searchTerm="" onSearch={handleSearch} />,
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test Search' } });
    fireEvent.click(getByRole('button'));

    expect(localStorage.getItem('searchTerm')).toBe('Test Search');
  });

  it('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Saved Search');
    const { getByRole } = render(
      <Search searchTerm="Saved Search" onSearch={jest.fn()} />,
    );

    const input = getByRole('textbox');
    expect(input).toHaveValue('Saved Search');
  });
});
