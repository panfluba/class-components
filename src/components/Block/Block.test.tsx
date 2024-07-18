import { render } from '@testing-library/react';
import Block from './Block';
import { Item } from '../types';
import '@testing-library/jest-dom/extend-expect';

const mockResults: Item[] = [
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

describe('Block Component', () => {
  it('renders the specified number of cards', () => {
    const { getByText } = render(<Block results={mockResults} />);
    expect(getByText('Pizza 1')).toBeInTheDocument();
    expect(getByText('Pizza 2')).toBeInTheDocument();
  });

  it('displays appropriate message if no cards are present', () => {
    const { getByText } = render(<Block results={[]} />);
    expect(getByText('No cards available')).toBeInTheDocument();
  });
});
