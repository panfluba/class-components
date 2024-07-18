import React from 'react';
import styles from './search.module.scss';
import findIcon from '../../assets/img/search.svg';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ searchTerm, onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img
        className={`${styles.icon} ${styles.icon__find}`}
        src={findIcon}
        alt="Search Icon"
      />
      <input
        className={styles.input}
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
