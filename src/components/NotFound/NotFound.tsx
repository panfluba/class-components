import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';

interface NotFoundProps {
  resetSearch: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ resetSearch }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetSearch();
    navigate('/');
  };

  return (
    <div className={styles.notFound}>
      <h1>404 - Страница не найдена</h1>
      <button className={styles.goHomeButton} onClick={handleGoHome}>
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFound;
