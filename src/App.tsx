import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<NotFound resetSearch={() => {}} />} />
      </Routes>
    </Router>
  );
};

export default App;
