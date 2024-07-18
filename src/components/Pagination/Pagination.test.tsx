import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const TestComponent = () => {
  const location = useLocation();
  return <span>{location.search}</span>;
};

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route
            path="/"
            element={
              <Pagination
                totalItems={100}
                itemsPerPage={10}
                currentPage={1}
                onPageChange={jest.fn()}
              />
            }
          />
          <Route path="/" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(getByText('2'));
    expect(getByText('?page=2')).toBeInTheDocument();
  });
});
