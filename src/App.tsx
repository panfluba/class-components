import { Component } from 'react';
import Search from './components/Search/Search';
import Block from './components/Block/Block';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Item } from './components/types';
import axios from 'axios';

interface State {
  searchTerm: string;
  results: Item[];
  filteredResults: Item[];
  loading: boolean;
  error: Error | null;
}

class App extends Component<Record<string, never>, State> {
  state: State = {
    searchTerm: '',
    results: [],
    filteredResults: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedSearchTerm }, this.fetchResults);
  }

  fetchResults = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://665da1fee88051d6040799ed.mockapi.io/pizzas`,
      );
      const results: Item[] = response.data;
      this.setState({ results }, () =>
        this.filterResults(this.state.searchTerm),
      );
    } catch (error) {
      this.setState({ error: error as Error });
    } finally {
      this.setState({ loading: false });
    }
  };

  filterResults = (searchTerm: string) => {
    const filteredResults = this.state.results.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    this.setState({ filteredResults });
  };

  handleSearch = (searchTerm: string) => {
    searchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.setState({ searchTerm }, () => this.filterResults(searchTerm));
  };

  render() {
    const { searchTerm, filteredResults, loading, error } = this.state;
    return (
      <ErrorBoundary>
        <div>
          <Search searchTerm={searchTerm} onSearch={this.handleSearch} />
          {loading && <div>Подождите, идет загрузка всех элементов...</div>}
          {error && (
            <div>
              Ошибка загрузки, повторите еще раз или перезагрузите страницу
            </div>
          )}
          <Block results={filteredResults} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
