import React, { Component } from 'react';
import styles from './search.module.scss';
import findIcon from '../../assets/img/search.svg';

import _ from 'lodash';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  state: State = {
    searchTerm: this.props.searchTerm,
  };

  debouncedSearch = _.debounce(() => {
    this.props.onSearch(this.state.searchTerm);
  }, 500);

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value }, this.debouncedSearch);
  };

  render() {
    return (
      <div className={styles.root}>
        <img
          className={`${styles.icon} ${styles.icon__find}`}
          src={findIcon}
        ></img>
        <input
          className={styles.input}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
