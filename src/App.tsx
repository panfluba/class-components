// App.tsx
import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
