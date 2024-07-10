import { Component } from 'react';
import { Item } from '../types';
import styles from './block.module.scss';

interface Props {
  results: Item[];
}

class Block extends Component<Props> {
  render() {
    const { results } = this.props;
    return (
      <div className={styles.root}>
        {results.map(item => (
          <div className={styles.block} key={item.id}>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Block;
