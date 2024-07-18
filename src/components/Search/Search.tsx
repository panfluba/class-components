import React, { useState, useEffect } from 'react';
import styles from './search.module.scss';
import findIcon from '../../assets/img/search.svg';

type TSearchProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const Search: React.FC<TSearchProps> = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(term);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [term, onSearch]);

  return (
    <div className={styles.root}>
      <img
        className={`${styles.icon} ${styles.icon__find}`}
        src={findIcon}
        alt="search-icon"
      />
      <input
        className={styles.input}
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
