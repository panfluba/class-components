import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../components/Search/Search';
import Block from '../components/Block/Block';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Pagination from '../components/Pagination/Pagination';
import { Item } from '../components/types';
import axios from 'axios';
import useSearchQuery from '../hooks/useSearchQuery';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useSearchQuery('');
  const [results, setResults] = useState<Item[]>([]);
  const [filteredResults, setFilteredResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);
  const itemsPerPage = 10;

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
  }, [searchTerm, results, loading, error]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    navigate('/?page=1');
  };

  const paginatedResults = filteredResults.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <ErrorBoundary>
      <div>
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        {loading && <div>Подождите, идет загрузка всех элементов...</div>}
        {error && (
          <div>
            Ошибка загрузки, повторите еще раз или перезагрузите страницу
          </div>
        )}
        <Pagination
          totalItems={filteredResults.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={newPage => navigate(`/?page=${newPage}`)}
        />
        <Block results={paginatedResults} />
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
