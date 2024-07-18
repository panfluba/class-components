import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SearchPage from './SearchPage';

test('renders SearchPage component', () => {
  const { getByText } = render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>,
  );
  expect(getByText('Search Page')).toBeInTheDocument();
});
