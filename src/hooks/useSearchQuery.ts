import { useEffect, useState } from 'react';

const useSearchQuery = (initialValue: string) => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || initialValue;
  });

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchQuery;
