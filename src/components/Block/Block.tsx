import React from 'react';
import styles from './block.module.scss';
import { Item } from '../types';

type TBlockProps = {
  results: Item[];
};

const Block: React.FC<TBlockProps> = ({ results }) => {
  return (
    <div className={styles.root}>
      {results.length === 0 ? (
        <div>Ничего не найдено</div>
      ) : (
        results.map(item => (
          <div className={styles.block} key={item.id}>
            <div>{item.title}</div>
            <img src={item.image} alt={item.title} />
            <div>{item.description}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Block;
