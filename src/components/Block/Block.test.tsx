import React from 'react'; // Add this import
import { render } from '@testing-library/react';
import Block from './Block';
import { Item } from '../types';

describe('Block', () => {
  const mockResults: Item[] = [
    {
      id: '1',
      title: 'Title 1',
      image: 'image1.jpg',
      description: 'Description 1',
    },
  ];

  test('renders correctly with results', () => {
    const { getByText } = render(<Block results={mockResults} />);
    expect(getByText('Title 1')).toBeInTheDocument();
  });

  test('renders correctly without results', () => {
    const { getByText } = render(<Block results={[]} />);
    expect(getByText('Ничего не найдено')).toBeInTheDocument();
  });
});
