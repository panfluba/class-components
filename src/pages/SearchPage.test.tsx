import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchPage from './SearchPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResults = [
  {
    id: '1',
    title: 'Pizza 1',
    image: 'image1.png',
    description: '',
    types: [],
    sizes: [],
    price: 0,
    category: 0,
    rating: 0,
  },
  {
    id: '2',
    title: 'Pizza 2',
    image: 'image2.png',
    description: '',
    types: [],
    sizes: [],
    price: 0,
    category: 0,
    rating: 0,
  },
];

describe('SearchPage Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResults });
    const { getByText } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(
      getByText('Подождите, идет загрузка всех элементов...'),
    ).toBeInTheDocument();
  });

  it('renders results after fetching data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResults });
    const { getByText } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    await waitFor(() => expect(getByText('Pizza 1')).toBeInTheDocument());
    expect(getByText('Pizza 2')).toBeInTheDocument();
  });

  it('displays an error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Fetch error'));
    const { getByText } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(
        getByText(
          'Ошибка загрузки, повторите еще раз или перезагрузите страницу',
        ),
      ).toBeInTheDocument(),
    );
  });

  it('displays "No cards available" if no search results found', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    const { getByText } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(getByText('No cards available')).toBeInTheDocument(),
    );
  });
});
