import React, { useState, useEffect } from 'react';
import Search from '../components/Search/Search';
import Block from '../components/Block/Block';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { Item } from '../components/types';
import axios from 'axios';
import useSearchQuery from '../hooks/useSearchQuery';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchQuery('');
  const [results, setResults] = useState<Item[]>([]);
  const [filteredResults, setFilteredResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          'https://665da1fee88051d6040799ed.mockapi.io/pizzas',
        );
        setResults(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const filtered = results.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredResults(filtered);
  }, [searchTerm, results]);

  return (
    <ErrorBoundary>
      <div>
        <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
        {loading && <div>Подождите, идет загрузка всех элементов...</div>}
        {error && (
          <div>
            Ошибка загрузки, повторите еще раз или перезагрузите страницу
          </div>
        )}
        {filteredResults.map(item => (
          <Block key={item.id} {...item} />
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
